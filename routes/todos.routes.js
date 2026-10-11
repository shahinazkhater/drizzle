import express from "express";

import { getAllTodos, getTodoById, createTodo,updateTodo, toggleTodo, deleteTodoById }
from  "../db/queries/todos.query.js";
import { todoInsertchema } from "../db/validation-schema.js";


export const todosRouter= express.Router();





todosRouter.get("/", async (req, res)=>{

    const todo = await getAllTodos();
    res.json({
        data: todo,
    });
});
/////////////////////////////////////////////////////////////////

todosRouter.get("/:todo_id", async(req, res)=>{
    const todo = await getTodoById(req.params.todo_id);
    
    if(!todo){
      return res.status(404).json ({
        message:"Todo not found"
      });


    }
    res.json({
        data: todo,
    });
});


/////////////////////////////////////////////////////////////////


todosRouter.post("/", async(req, res)=>{
  const body =todoInsertchema.parse(req.body);

  console.log(body);

const todo =await createTodo(body)

res.status(201).json({
    message: "Todo created successfully",
    data : todo,
});

});
/////////////////////////////////////////////////////////////////

todosRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = todoInsertchema.partial().parse(req.body);
 

  // if (!todo) {
  //   return res.status(404).json({
  //     message: "Todo not found"
  //   });
  // }

  const updatedTodo = await updateTodo(
    id,
    body
  );

  return res.status(200).json({
    message: "Todo updated successfully",
    data: updatedTodo
  });
});


todosRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const todo = await deleteTodoById(id);

  if (!todo) {
    return res.status(404).json({
      message: "Todo not found"
    });
  }

  return res.status(200).json({
    mssage: "Todo deleted successfully"
  });
});


todosRouter.patch("/:id/toggle", async (req, res) => {
  const id = req.params.id;
  const todo = await toggleTodo(id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  return res.json({ data: todo });
});
