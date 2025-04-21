import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null); // Para edición

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then(setUsers)
            .catch((err) => console.error("Error al obtener usuarios", err));
    }, []);

    const handleDelete = (id) => {
        MySwal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                setUsers((prev) => prev.filter((u) => u.id !== id));
                MySwal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
            }
        });
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        MySwal.fire({
            title: "Editar Usuario",
            html: `
        <input id="name" class="swal2-input" placeholder="Nombre" value="${user.name}">
        <input id="email" class="swal2-input" placeholder="Email" value="${user.email}">
        <input id="website" class="swal2-input" placeholder="Website" value="${user.website}">
      `,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            preConfirm: () => {
                const name = document.getElementById("name").value;
                const email = document.getElementById("email").value;
                const website = document.getElementById("website").value;

                if (!name || !email || !website) {
                    Swal.showValidationMessage("Todos los campos son obligatorios");
                    return false;
                }

                return { name, email, website };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const updated = users.map((u) =>
                    u.id === user.id
                        ? { ...u, ...result.value }
                        : u
                );
                setUsers(updated);
                MySwal.fire("Actualizado", "Los datos fueron modificados.", "success");
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 overflow-x-auto rounded-xl shadow-md bg-white">
            <h2 className="text-lg font-semibold mb-4 px-4 pt-4">
                Tabla de usuarios
            </h2>

            <table className="w-full table-auto text-left text-sm">
                <thead className="border-b font-medium text-gray-600">
                    <tr>
                        <th className="px-4 py-2">ID ↑</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Website</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.slice(0, 5).map((user) => (
                        <tr
                            key={user.id}
                            onClick={() => setSelectedUserId(user.id)}
                            className={`cursor-pointer transition ${selectedUserId === user.id ? "bg-gray-200" : "hover:bg-gray-100"
                                }`}
                        >
                            <td className="px-4 py-2">{user.id}</td>
                            <td className="px-4 py-2">{user.name}</td>
                            <td className="px-4 py-2">{user.email}</td>
                            <td className="px-4 py-2">{user.website}</td>
                            <td className="px-4 py-2 flex gap-3 items-center">
                                <Pencil
                                    className="text-teal-700 hover:scale-110 cursor-pointer"
                                    size={18}
                                    onClick={() => handleEdit(user)}
                                />
                                <Trash2
                                    className="text-red-600 hover:scale-110 cursor-pointer"
                                    size={18}
                                    onClick={() => handleDelete(user.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedUserId && (
                <div className="p-4 border-t mt-4">
                    <h3 className="text-md font-semibold mb-2 text-gray-800">
                        Usuario seleccionado:
                    </h3>
                    <div className="text-sm text-gray-700 space-y-1">
                        <p><strong>Nombre:</strong> {users.find(u => u.id === selectedUserId)?.name}</p>
                        <p><strong>Email:</strong> {users.find(u => u.id === selectedUserId)?.email}</p>
                        <p><strong>Website:</strong> {users.find(u => u.id === selectedUserId)?.website}</p>
                    </div>
                </div>
            )}
        </div>
    );
};
