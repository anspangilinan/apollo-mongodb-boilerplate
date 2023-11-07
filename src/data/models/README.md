# Models Package

The "models" package contains Mongoose models for various entities used in the Peagle Delivery system. To maintain a structured and organized approach, it is recommended to create a separate folder for each model, encapsulating related files for clarity and maintainability.

## Guidelines

1. **Separation of Concerns**: Each model folder should encapsulate everything related to a specific entity, separating models, enums/interfaces, and exports.
2. **Maintain Encapsulation**: Ensure that models and types are encapsulated within their respective folder, avoiding unnecessary dependencies.
3. **Consistent Naming**: Use consistent and descriptive names for models, types, and files to enhance readability and understanding.
   1. Class declarations should be in PascalCasedEntityName
   2. File names should be in camelCasedEntityName.model.ts

## Folder Structure

Each model folder should adhere to the following structure:

### `someName`

- **someName.model.ts**: Defines Mongoose models and discriminators related to the `SomeName` entity.
- **someName.type.ts**: Contains enums and interfaces used by the `SomeName` model.
- **index.ts**: Exports encapsulated models and types for the `SomeName` entity.

## Example

For instance, considering a 'Vehicle' model, the folder structure might appear as follows:

### `vehicle`

- **vehicle.model.ts**
- **vehicle.type.ts**
- **index.ts**

## Getting Started

1. **Create a New Model**: To add a new model, create a new folder following the specified structure.
2. **Define Models and Types**: Write Mongoose models in the .model.ts file and define related enums/interfaces in the .type.ts file.
3. **Export Entities**: Use the index.ts file to export encapsulated models and types for seamless accessibility within the application.

Remember to maintain consistency and adhere to the folder structure for better organization and clarity.
