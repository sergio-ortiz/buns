let todos = [];

Bun.serve({
	async fetch(request) {
		const url = new URL(request.url);

		if(url.pathname === '/') {
			todos = [];
			return new Response(Bun.file("index.html"), {
				headers: {
					"Content-Type": "text/html",
				},
			});
		}

		if(url.pathname === '/create') {
			const formdata = await request.formData();
			const todo = formdata.get('todo');
			todos.push(todo);

			const todolist = todos.map(todo => `<li>${todo}</li>`).join('');
			return new Response(`<ul id="todos">${todolist}</ul>`, {
				headers: {
					"Content-Type": "text/html",
				},
			});
		}

		return new Response("Not Found", { status: 404 });
	},
});
