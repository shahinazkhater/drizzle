import {eq} from "drizzle-orm";
import {db} from "../db.js";
import {todos} from "../schema.js";


export async function getAllTodos(){
    const data = await db 
    .select({
        id : todos.id,
        title : todos.title,
           done : todos.done ,
        body : todos.body,
        created_at : todos.created_at,
    })
    .from(todos)
    
    return data;

}

export async function getTodoById(id){
    const data = await db.select({
           id : todos.id,
        title : todos.title,
        done : todos.done ,
        body : todos.body,
        created_at : todos.created_at,
    })
    .from(todos).where(eq(todos.id, id))
   .limit(1);


    // هترجع مصفوفه فبنجيب اول عنصر فيها
  if (data.length) {
    return data[0];
  } else {
    return false;
  }
}





export async function createTodo({
     title,body,done, created_at
}) {
const res= await db.insert(todos).values({
     
        title :title,
        done :done ,
        body : body,
        created_at : created_at
        
})
.returning();
return res[0];
}



export async function updateTodo(id, body){
    const res= await db.update(todos).set(body).where(eq(todos.id,id));
    return res;
}


export async function deleteTodoById(id){
  const res=  await db.delete(todos).where(eq(todos.id,id))
  .returning();

  return res[0];
}



export async function toggleTodo(id){
    const todo= await db.select().from(todos)
    .where(eq(todos.id,id));

if(!todo[0]) return null;


    const data = await db.update(todos).set({done: !todo[0] .done}).where(eq(todos.id, id))
    .returning();
return data[0];
}