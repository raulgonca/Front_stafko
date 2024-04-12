import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, QueryClient } from 'react-query';
import { Table } from 'primereact/table';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useMutationMode, useResource } from '@pankod/refine';
import Swal from 'sweetalert2';

const queryClient = new QueryClient();

const Dashboard = () => {
    const [proyectos, setProyectos] = useState([]);
    const { data, isLoading, error } = useQuery('data', () => Promise.resolve(proyectos), {
        enabled: !!proyectos.length,
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3000/projects/");
                if (response.ok) {
                    const data = await response.json();
                    setProyectos(data);
                } else {
                    console.error("Error al obtener los proyectos:", response.statusText);
                }
            } catch (error) {
                console.error("Error al comunicarse con el servidor:", error);
            }
        }
        fetchData();
    }, []);

    const { mutate: deleteItem } = useMutation(deleteData, {
        onSuccess: () => {
            queryClient.invalidateQueries('data');
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Item deleted successfully' });
        },
        onError: () => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete item' });
        },
    });
    const { setIsEditing } = useMutationMode();
    const resource = useResource();

    const confirmDelete = (id) => {
        confirmDialog({
            message: 'Are you sure you want to delete this item?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                deleteItem(id);
            },
            reject: () => {},
        });
    };

    const editItem = (id) => {
        setIsEditing({ [resource]: id });
    };

    const toast = React.useRef(null);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const columns = [
        { field: 'id', header: 'ID' },
        { field: 'name', header: 'Name' },
        { field: 'description', header: 'Description' },
        { field: 'actions', header: 'Actions' },
    ];

    const actionTemplate = (rowData) => {
        return (
            <div>
                <Button label="Edit" icon="pi pi-pencil" className="p-button-rounded p-button-info" onClick={() => editItem(rowData.id)} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDelete(rowData.id)} />
            </div>
        );
    };

    const dynamicColumns = columns.map((col) => {
        if (col.field === 'actions') {
            return { ...col, body: actionTemplate };
        }
        return col;
    });

    return (
        <div>
            <Toast ref={toast} />
            <Table value={data} header={resource} className="p-datatable-striped">
                {dynamicColumns.map((col) => (
                    <columns key={col.field} field={col.field} header={col.header} />
                ))}
            </Table>
        </div>
    );
};

async function deleteData(proyectoId) {
    try {
        const response = await fetch(`http://localhost:3000/projects/${proyectoId}`, {
            method: "DELETE"
        });
        if (response.ok) {
            // Mostrar una alerta SweetAlert al eliminar el proyecto
            Swal.fire({
                title: 'Proyecto eliminado',
                text: 'El proyecto ha sido eliminado exitosamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            // No necesitamos actualizar la lista de proyectos aquí
        } else {
            console.error("Error al eliminar el proyecto:", response.statusText);
        }
    } catch (error) {
        console.error("Error al comunicarse con el servidor:", error);
    }
}


export default Dashboard;