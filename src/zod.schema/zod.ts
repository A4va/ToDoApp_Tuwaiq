import { TypeOf, z } from 'zod';

const userObj = z.object({
  id: z.string({
    required_error: 'ID IS REQUIRED !',
    invalid_type_error: 'IT MUST BE A STRING !',
  }),
  name: z.string({
    required_error: 'NAME IS REQUIRED !',
    invalid_type_error: 'IT MUST BE A STRING !',
  }),
  email: z.string({
    required_error: 'EMAIL IS REQUIRED !',
    invalid_type_error: 'IT MUST BE A STRING !',
  }).email(),
  password: z.string({
    required_error: 'PASSWORD IS REQUIRED !',
    invalid_type_error: 'IT MUST BE A STRING !',
  }), 
});

const addU = z.object({
  body: userObj.omit({ id: true }),
});

const updateU = z.object({
  body: userObj.pick({ email:true , password:true}),
});

export type AddUTypeSchema = TypeOf<typeof addU>['body'];
export type UpdateUTypeSchema = TypeOf<typeof updateU>['body'];


const taskCheck = z.object({
        id: z.string({
            required_error: 'ID IS REQUIRED !',
            invalid_type_error: 'IT MUST BE A STRING !',
        }),
        title: z.string({
            required_error: 'TITLE IS REQUIRED !',
            invalid_type_error: 'IT MUST BE A STRING !'
        }),
        userID: z.string({
            required_error: 'TITLE IS REQUIRED !',
            invalid_type_error: 'IT MUST BE A STRING !'
        }),
        isCompleted: z.boolean({invalid_type_error: 'IT MUST BE A STRING !'})
})

const addT = z.object({
    body: taskCheck.pick({ title: true, isCompleted: true }),
});

const updateT = z.object({
    body: taskCheck.pick({ title: true, isCompleted: true }),
});

export type AddTTypeSchema = TypeOf<typeof addT>['body'];
export type UpdateTTypeSchema = TypeOf<typeof updateT>['body'];

export default {
    addU,
    updateU,
    addT,
    updateT
}





  
