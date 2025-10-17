import * as zod from 'zod'
import { schema } from './Login.schema'



export type LoginBodyType = zod.infer <typeof schema>;