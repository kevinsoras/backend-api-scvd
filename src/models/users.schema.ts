import z from "zod";
export const UsersDataSchema = z.object({
  name: z.string({
    required_error: "El campo 'name' no puede estar vacío.",
    invalid_type_error: "El campo 'name' debe ser string.",
  }).min(1,{message:"El campo 'name' no puede estar vacío."}),
  email: z
    .string({
      required_error: "El campo 'email' no puede estar vacío.",
      invalid_type_error: "El campo 'email' debe ser string.",
    })
    .email({ message: "El formato del campo 'email' es inválido." }),
  age: z.coerce
    .number({
      required_error: "El campo 'age' no puede estar vacío.",
      invalid_type_error: "El campo 'age' debe ser un numero.",
    })
    .int({ message: "El campo 'age' debe ser entero." })
    .positive({ message: "El campo 'age' debe ser un número positivo." })
    .optional()
});

export type UserData = z.infer<typeof UsersDataSchema> & {order:number};
