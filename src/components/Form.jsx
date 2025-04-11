import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import { estadosMexico } from "../utils/estados";
import { InputField } from "./InputField";
import { SelectField } from "./SelectedField";
import { validateFields } from "../utils/validateForm";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const Form = () => {
    const {
        formState,
        onInputChange,
    } = useForm({
        nombre: "",
        primerApellido: "",
        segundoApellido: "",
        curp: "",
        rfc: "",
        codigoPostal: "",
        calle: "",
        numeroExterior: "",
        numeroInterior: "",
        estado: "",
        delegacion: "",
        colonia: "",
    });

    const [errors, setErrors] = useState({});


    const handleSubmit = async () => {
        const isValid = validateFields(formState, setErrors);
        if (!isValid) {
            MySwal.fire({
                icon: 'error',
                title: 'Existen campos por validar',
                text: 'Por favor corrige los errores en el formulario.',
            });
            return;
        }

        const payload = {
            infoUsuario: {
                nombre: formState.nombre,
                primerApellido: formState.primerApellido,
                segundoApellido: formState.segundoApellido,
                curp: formState.curp,
                rfc: formState.rfc,
            },
            domicilio: {
                calle: formState.calle,
                codigoPostal: formState.codigoPostal,
                numeroExterior: formState.numeroExterior,
                numeroInterior: formState.numeroInterior,
                estado: formState.estado,
                delegacion: formState.delegacion,
                colonia: formState.colonia,
            },
        };

        try {
            const response = await fetch('http://httpbin.org/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data);

            MySwal.fire({
                icon: 'success',
                title: 'Campos validados correctamente',
                text: 'Datos enviados exitosamente',
            });
        } catch (error) {
            console.error("Error al enviar:", error);
            MySwal.fire({
                icon: 'error',
                title: 'Error de red',
                text: 'No se pudo enviar la información',
            });
        }
    };


    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4 pt-4">
                Formulario
            </h2>
            <form className="w-full flex flex-wrap gap-4 text-[#43A9A2] text-sm font-medium">

                <div className="w-full grid grid-cols-3 gap-6">
                    <InputField
                        label="Nombre"
                        name="nombre"
                        value={formState.nombre}
                        onChange={onInputChange}
                        error={errors.primerApellido}
                        required
                        colSpan={1}
                    />


                    <InputField
                        label="Primer Apellido"
                        name="primerApellido"
                        value={formState.primerApellido}
                        onChange={onInputChange}
                        error={errors.primerApellido}
                        required
                        colSpan={1}
                    />


                    <InputField
                        label="Segundo apellido"
                        name="sgundoApellido"
                        value={formState.segundoApellido}
                        onChange={onInputChange}
                        error={errors.segundoApellido}
                        required
                        colSpan={1}
                    />

                </div>

                <div className="w-full grid grid-cols-2 gap-6">
                    <InputField
                        label="CURP"
                        name="curp"
                        value={formState.curp}
                        onChange={onInputChange}
                        error={errors.curp}
                        required
                    />


                    <InputField
                        label="RFC (con homoclave)"
                        name="rfc"
                        value={formState.rfc}
                        onChange={onInputChange}
                        error={errors.rfc}
                        required
                    />
                </div>


                <div className="w-full grid grid-cols-2 gap-6">
                    <InputField
                        label="Codigo Postal"
                        name="codigoPostal"
                        value={formState.codigoPostal}
                        onChange={onInputChange}
                        error={errors.codigoPostal}
                        required
                    />


                    <InputField
                        label="Calle"
                        name="calle"
                        value={formState.calle}
                        onChange={onInputChange}
                        error={errors.calle}
                        required
                    />

                </div>

                <div className="w-full grid grid-cols-3 gap-6">
                    <InputField
                        label="Numero exterior"
                        name="codigoPostal"
                        value={formState.numeroExterior}
                        onChange={onInputChange}
                        error={errors.numeroExterior}
                        required
                        colSpan={2}
                    />

                    <InputField
                        label="Numero interior"
                        name="numeroInterior"
                        value={formState.numeroInterior}
                        onChange={onInputChange}
                        error={errors.numeroInterior}
                        colSpan={2}
                    />

                    <SelectField
                        label="Estado"
                        name="estado"
                        value={formState.estado}
                        onChange={onInputChange}
                        options={estadosMexico}
                        error={errors.estado}
                        required
                        placeholder="Selecciona un estado"
                        colSpan={2}
                    />

                </div>

                <div className="w-full grid grid-cols-2 gap-6">
                    <InputField
                        label="Delegacion / Municipio"
                        name="delegacion"
                        value={formState.delegacion}
                        onChange={onInputChange}
                        error={errors.delegacion}
                        required
                        colSpan={3}
                    />

                    <InputField
                        label="Colonia"
                        name="colonia"
                        value={formState.colonia}
                        onChange={onInputChange}
                        error={errors.colonia}
                        required
                        colSpan={3}
                    />
                </div>
            </form>

            <div className="mt-6 flex justify-center">
                <button
                    type="button"
                    onClick={handleSubmit} // Solo para prueba
                    className="bg-[#43A9A2] text-white font-semibold px-10 py-3 rounded-xl hover:bg-[#388c86] transition"
                >
                    Guardar
                </button>
            </div>
        </div>
    );
};
