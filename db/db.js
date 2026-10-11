// 1. بيجهّز الاتصال: بيقرأ عنوان قاعدة البيانات من .env.
// 2. بيعمل Pool: بيدير اتصالات المشروع بقاعدة البيانات.
// 3. بيجهّز Drizzle: عشان نقدر نكتب استعلامات زي الإضافة والتعديل والحذف باستخدام db.



import {drizzle} from "drizzle-orm/node-postgres";

import{Pool} from "pg";


process.loadEnvFile()

const pool = new Pool({
     connectionString: process.env.DATABASE_URL,

});

export const db = drizzle ({client :pool});