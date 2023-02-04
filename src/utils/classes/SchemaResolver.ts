import { ChacaError } from "../../errors/ChacaError.js";
import { PrivateUtils } from "../helpers/PrivateUtils.js";
import { SchemaToResolve } from "../interfaces/schema.interface.js";
import { ChacaInputTree } from "./ChacaInputTree/ChacaInputTree.js";
import {
  ChacaTreeNode,
  CustomValueNode,
  EnumValueNode,
  MixedValueNode,
  SchemaValueNode,
} from "./ChacaInputTree/classes/index.js";
import { ChacaResultTree } from "./ChacaResultTree/ChacaResultTree.js";
import {
  DocumentTree,
  FieldNode,
  ArrayResultNode,
  MixedFieldNode,
  SingleResultNode,
} from "./ChacaResultTree/classes/index.js";

export class SchemaResolver<K, T> {
  private inputTree: ChacaInputTree<K>;
  private resultTree: ChacaResultTree<K>;

  constructor(schemaObject: SchemaToResolve<T>) {
    this.inputTree = new ChacaInputTree(schemaObject);
    this.resultTree = new ChacaResultTree<K>();
  }

  public resolve(numDocs: number): Array<K> {
    for (let indexDoc = 0; indexDoc < numDocs; indexDoc++) {
      const newDoc = new DocumentTree<K>();

      // insert new document
      this.resultTree.insertDocument(newDoc);

      // recorrer los fields del dataset actual para crear cada uno en el documento que le pertenece
      for (const datField of this.inputTree.getFields()) {
        const fieldSolutionNode = this.createSolutionNodeByType(
          datField,
          indexDoc,
        );

        // insertar la solucion del field en el documento
        newDoc.insertField(fieldSolutionNode);

        // resolver el field actual en caso de ser un array o un mixed
        this.resolveArrayAndMixedFields(datField, fieldSolutionNode, indexDoc);
      }
    }

    return this.resultTree.getDocumentsArray();
  }

  private resolveArrayAndMixedFields(
    field: ChacaTreeNode,
    fieldSolution: FieldNode,
    indexDoc: number,
  ) {
    // en caso de que sea un mixed field
    if (
      field instanceof MixedValueNode &&
      fieldSolution instanceof MixedFieldNode
    ) {
      this.createMixedSubFields(fieldSolution, field, indexDoc);
    }

    // en caso de que sea un array field
    else if (fieldSolution instanceof ArrayResultNode) {
      this.createArrayFieldSolution(fieldSolution, field, indexDoc);
    }
  }

  private createArrayFieldSolution(
    solutionArrayNode: ArrayResultNode,
    field: ChacaTreeNode,
    indexDoc: number,
  ) {
    if (field.nodeConfig.isArray) {
      // limite del arreglo de valores
      const limit = PrivateUtils.intNumber({
        min: field.nodeConfig.isArray.min,
        max: field.nodeConfig.isArray.max,
      });

      // resolver el field hasta llegar al limite del array
      for (let arrayIndex = 0; arrayIndex < limit; arrayIndex++) {
        // resolver el field y guardarlo en un nodo
        const fieldSolutionNode = this.createSolutionNodeByType(
          field.getNoArrayNode(),
          indexDoc,
        );

        // insertar el field en el array de soluciones
        solutionArrayNode.insertNode(fieldSolutionNode);

        // resolver el field en caso de ser un mixed field
        this.resolveArrayAndMixedFields(field, fieldSolutionNode, indexDoc);
      }
    }
  }

  private createMixedSubFields(
    solutionMixedNode: MixedFieldNode,
    field: MixedValueNode,
    indexDoc: number,
  ): void {
    for (const f of field.getFields()) {
      // filtrar el subField segun su tipo
      const subFieldSolutionNode = this.createSolutionNodeByType(f, indexDoc);

      // insertar la solucion del field en la solucion del mixed field pasado por parametro
      solutionMixedNode.insertNode(subFieldSolutionNode);

      // resolver el subField en caso de ser un array o un mixed field
      this.resolveArrayAndMixedFields(f, subFieldSolutionNode, indexDoc);
    }
  }

  private createSolutionNodeByType(
    field: ChacaTreeNode,
    indexDoc: number,
  ): FieldNode {
    // en caso de ser un array
    if (field.nodeConfig.isArray) {
      return new ArrayResultNode(field.getFieldInfo(), field);
    }

    // en caso de no ser un array
    else {
      // en caso de ser un schema field
      if (field instanceof SchemaValueNode) {
        return new SingleResultNode(
          field.getFieldInfo(),
          field.schema.getValue(),
        );
      }

      // en caso de ser un custom field
      else if (field instanceof CustomValueNode) {
        // obtener el valor de la funcion pasando como parametro el documento actual del ciclo
        const value = field.getValue(
          this.resultTree.getDocumentByIndex(indexDoc).getDocumentObject(),
        );

        return new SingleResultNode(field.getFieldInfo(), value);
      }

      // en caso de ser un mixed field
      else if (field instanceof MixedValueNode) {
        return new MixedFieldNode(field.getFieldInfo());
      }

      // en caso de ser un enum field
      else if (field instanceof EnumValueNode) {
        return new SingleResultNode(
          field.getFieldInfo(),
          PrivateUtils.oneOfArray(field.enumOptions),
        );
      }

      // en caso de no ser ninguno de los anteriores
      else {
        throw new ChacaError(
          `${field.nodeConfig.name} has an invalid method of solution`,
        );
      }
    }
  }
}
