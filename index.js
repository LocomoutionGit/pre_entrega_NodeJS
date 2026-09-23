const args = process.argv.slice(2);

async function obtenerProductos(url) {
    try{
        const response = await fetch(`https://fakestoreapi.com/${url}`);
        const data = await response.json();
        console.log(data);
    }catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

async function eliminarProducto(id) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            console.log(`Producto con id ${id} eliminado satisfactoriamente`);
        } else {
            console.error('Error al eliminar el producto:', response.statusText);
        }
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
}

async function crearProducto(producto) {
    try {
        const response = await fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            body: JSON.stringify(producto),
        });
        if (response.ok) {
            const data = await response.json();
            console.log('id del producto creado:', data.id);
        } else {
            console.error('Error al crear el producto:', response.statusText);
        }
    } catch (error) {
        console.error('Error al crear el producto:', error);
    }
}


switch (args[0]) {
    case "GET":
        console.log("Comando GET recibido");
        if (args[1].startsWith("products")) {
                const products = await obtenerProductos(args[1]);
                console.log(`Recibimos ${args[1]} satisfactoriamente`);
                }else {
                    console.log("Error: Comando incompleto o erroneo. Debe incluir 'products' o 'products/{id}'");
                }
        break;
    case "POST":
        console.log("Comando POST recibido");
        if (args[1] == "products" && args[2] && args[3] && args[4]) {
            await crearProducto({title: args[2], price: args[3], category: args[4]});
            console.log(`Producto creado satisfactoriamente con title: ${args[2]}, price: ${args[3]}, category: ${args[4]}`);  
        }else {
            console.log("Error: Comando incompleto o erroneo. Debe incluir todos los datos para enviar y utilizar la palabra clave 'products'");
        }
        break;
    case "DELETE":
        console.log("Comando DELETE recibido");
        if (args[1].startsWith("products/")) {
                let id = args[1].split("/")[1];
                await eliminarProducto(id);
            }else {
                console.log("Error: Comando incompleto. Debe incluir un id para eliminar");
            }
        break;
    default:
        console.log("Error: Comando no reconocido");
}