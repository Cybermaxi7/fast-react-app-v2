import { createClient } from "@supabase/supabase-js";

// const API_URL = 'https://react-fast-pizza-api.onrender.com/api';
const supabaseUrl = "https://sgbcxwgijccsqnfbwhkb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnYmN4d2dpamNjc3FuZmJ3aGtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc2MzEzNjMsImV4cCI6MjAxMzIwNzM2M30.BPr8NlRlfV7DixUgqg6f7yiABfBpV-XFqBJP6ICb2WI";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getMenu() {
  const { data, error } = await supabase.from("pizzas").select();
  if (error) throw Error("Failed getting menu");
  const updatedData = data.map((pizza) => ({
    ...pizza,
    ingredients: JSON.parse(pizza.ingredients),
  }));
  return updatedData;
}

export async function getOrder(id) {
  const { data, error } = await supabase.from("order").select().eq("id", id);
  if (error) throw Error(`Couldn't find order #${id}`);

  return data;
}


export async function createOrder(newOrder) {
  try {
    const { error } = await supabase.from("order").insert(newOrder);
    console.log(error);
    //   const res = await fetch(`${API_URL}/order`, {
    //     method: "POST",
    //     body: JSON.stringify(newOrder),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    // });

    if (error) throw Error();
    if (!error) {
      const { data, error } = await supabase
        .from("order")
        .select("id")
        .order("id", { ascending: false })
        .limit(1);
      if (error) {
        console.log("There was a problem fetching the latest ID", error);
      } else {
        if (data.length > 0) {
          const latestId = data[0];
          console.log(latestId);
          return latestId.id;
        } else {
          console.log("No data found!");
        }
      }
    }
    // return data;
    // const { data } = await res.json();
    // return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

export async function updateOrder(id, updateObj) {
  try {
    // const res = await fetch(`${API_URL}/order/${id}`, {
    //   method: "PATCH",
    //   body: JSON.stringify(updateObj),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },

    // });
    const { error } = await supabase
      .from("order")
      .update(updateObj)
      .eq("id", id);
console.log(error)
    if (error) throw Error();
    
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error("Failed updating your order");
  }
}

