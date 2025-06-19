export enum Type {
  crops = "crops",
  livestock = "livestock",
  dairy = "dairy",
}

export enum ProductionType {
  crops = "crops",
  livestock = "livestock",
  dairy = "dairy",
}

export const getTypeFromDb = (type: string): Type => {
  switch (type) {
    case "crops":
      return Type.crops;
    case "livestock":
      return Type.livestock;
    case "dairy":
      return Type.dairy;
    default:
      throw new Error("Invalid type");
  }
};

export const getTypeFromUi = (type: ProductionType): Type => {
  switch (type) {
    case ProductionType.crops:
      return Type.crops;
    case ProductionType.livestock:
      return Type.livestock;
    case ProductionType.dairy:
      return Type.dairy;
    default:
      throw new Error("Invalid type");
  }
};
