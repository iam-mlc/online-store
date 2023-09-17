import { ObjectSchema, SchemaDescription } from "yup";

const isFieldRequired = (
  fieldName: string,
  validationSchema: ObjectSchema<Record<string, any>, unknown, unknown, "">
): boolean => {
  const field = validationSchema.describe().fields[fieldName];
  if (!field) throw new Error(`Field '${fieldName}' not found in schema`);
  return (field as SchemaDescription).tests.some(
    (test) => test.name === "required"
  );
};

export default isFieldRequired;