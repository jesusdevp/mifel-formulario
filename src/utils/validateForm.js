// utils/validateForm.js

export const validateFields = (formState, setErrors) => {
    const newErrors = {};

    const soloLetrasRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
    const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z\d]{2}$/i;
    const rfcRegex = /^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/i;
    const codigoPostalRegex = /^\d{5}$/;
    const numeroExteriorRegex = /^\d{1,5}$/;
    const numeroInteriorRegex = /^[a-zA-Z0-9]{1,10}$/;

    // Validar campos obligatorios
    const camposObligatorios = [
        "nombre",
        "primerApellido",
        "rfc",
        "curp",
        "calle",
        "codigoPostal",
        "numeroExterior",
        "estado",
        "delegacion",
        "colonia",
    ];

    camposObligatorios.forEach((campo) => {
        if (!formState[campo]?.trim()) {
            newErrors[campo] = "Este campo es obligatorio";
        }
    });

    // Validar solo letras
    const camposSoloLetras = [
        "nombre",
        "primerApellido",
        "segundoApellido",
        "estado",
        "delegacion",
        "colonia",
    ];

    camposSoloLetras.forEach((campo) => {
        const valor = formState[campo];
        if (valor && !soloLetrasRegex.test(valor)) {
            newErrors[campo] = "Solo se permiten letras";
        }
    });

    // Validar CURP y RFC
    if (formState.curp && !curpRegex.test(formState.curp)) {
        newErrors.curp = "CURP inválida";
    }

    if (formState.rfc && !rfcRegex.test(formState.rfc)) {
        newErrors.rfc = "RFC inválido";
    }

    // Validar código postal y número exterior
    if (formState.codigoPostal && !codigoPostalRegex.test(formState.codigoPostal)) {
        newErrors.codigoPostal = "Debe ser un número de 5 dígitos";
    }

    if (formState.numeroExterior && !numeroExteriorRegex.test(formState.numeroExterior)) {
        newErrors.numeroExterior = "Debe ser un número de 1 a 5 dígitos";
    }

    // Validar número interior
    if (
        formState.numeroInterior &&
        !numeroInteriorRegex.test(formState.numeroInterior)
    ) {
        newErrors.numeroInterior = "Solo alfanumérico (máx. 10 caracteres)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};