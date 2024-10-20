import { Database } from "bun:sqlite";
const db = new Database(":memory:");
const query = db.query("CREATE TABLE IF NOT EXISTS todos (todo TEXT NOT NULL)");
query.run();

Bun.serve({
	async fetch(request) {
		const url = new URL(request.url);

		if(url.pathname === '/') {
			return new Response(Bun.file("index.html"), {
				headers: {
					"Content-Type": "text/html",
				},
			});
		}

		if(url.pathname === '/create') {
			const formdata = await request.formData();
			const todo = formdata.get('todo');
			
			const query2 = db.query(`INSERT INTO todos (todo) VALUES ("${todo}")`);
			query2.run();
			const query3 = db.query("SELECT * FROM todos");
			const todos = query3.all();

			const todolist = todos.map(({ todo }) => `<li>${todo}</li>`).join('');
			return new Response(`<ul id="todos">${todolist}</ul>`, {
				headers: {
					"Content-Type": "text/html",
				},
			});
		}

		return new Response("Not Found", { status: 404 });
	},
});
