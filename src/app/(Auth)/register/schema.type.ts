import * as zod from 'zod'
import { schema } from './Register.schema'



export type RegisterBodyType = zod.infer <typeof schema>;