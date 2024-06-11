import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Clockify = ({ projectName }) => {
    const [timerActive, setTimerActive] = useState(false);
    const [description, setDescription] = useState('');
    const [timeEntryId, setTimeEntryId] = useState(null);
    const [projectId, setProjectId] = useState(null);

    useEffect(() => {
        if (projectName) {
            setDescription(`Trabajo en curso - ${projectName}`);
        }
    }, [projectName]);

    const startTimeEntry = async (startTime, projectId, description) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_CLOCKIFY}/time-entries`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': process.env.REACT_APP_API_KEY,
                },
                body: JSON.stringify({
                    start: startTime,
                    projectId,
                    description,
                }),
            });

            if (!response.ok) {
                throw new Error('Error starting time entry');
            }

            return await response.json();
        } catch (error) {
            console.error('Error starting time entry:', error);
            throw error;
        }
    };

    const createProject = async (projectName) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_CLOCKIFY}/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': process.env.REACT_APP_API_KEY,
                },
                body: JSON.stringify({ name: projectName }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error creating project');
            }

            const projectData = await response.json();
            return projectData.id; // Devolver el ID del proyecto
        } catch (error) {
            console.error('Error creating project:', error);
            throw error;
        }
    };

    const handleStartTimer = async () => {
        try {
            if (!timerActive && projectName) {
                if (!projectId) {
                    const projectId = await createProject(projectName);
                    setProjectId(projectId);
                }

                const startTime = new Date().toISOString();
                const taskDescription = description || `Trabajo en curso - ${projectName}`;

                const data = await startTimeEntry(startTime, projectId, taskDescription);

                setTimerActive(true);
                setTimeEntryId(data.id);

                Swal.fire({
                    icon: 'success',
                    title: 'Temporizador Iniciado',
                    text: 'El temporizador ha sido iniciado correctamente',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al iniciar el temporizador',
                    text: timerActive ? 'El temporizador ya está activo' : 'El nombre del proyecto no está disponible',
                });
            }
        } catch (error) {
            console.error('Error al iniciar el temporizador:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error al iniciar temporizador',
                text: `Hubo un problema al iniciar el temporizador: ${error.message}`,
            });
        }
    };

    const handleStopTimer = async () => {
        try {
            if (timerActive && timeEntryId) {
                const endTime = new Date().toISOString();
                const response = await fetch(`${process.env.REACT_APP_CLOCKIFY}/time-entries/${timeEntryId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': process.env.REACT_APP_API_KEY,
                    },
                    body: JSON.stringify({
                        end: endTime,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Error stopping time entry');
                }

                setTimerActive(false);
                setTimeEntryId(null);

                Swal.fire({
                    icon: 'info',
                    title: 'Temporizador Detenido',
                    text: 'El temporizador ha sido detenido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al detener el temporizador',
                    text: 'El temporizador no está activo',
                });
            }
        } catch (error) {
            console.error('Error al detener el temporizador:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error al detener temporizador',
                text: `Hubo un problema al detener el temporizador: ${error.message}`,
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-4">
            <div className="max-w-xl mx-auto rounded-lg p-3">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Clockify Timer</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Descripción del temporizador"
                        className="w-full px-3py-2 border rounded-lg focus:outline-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="flex justify-between mb-4">
                    <button
                        className={`bg-custom-purple text-white font-bold py-2 px-4 rounded ${!projectName || timerActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleStartTimer}
                        disabled={!projectName || timerActive}
                    >
                        {timerActive ? 'Iniciado' : 'Iniciar'}
                    </button>
                    <button
                        className="bg-custom-bluecito text-white font-bold py-2 px-4 rounded"
                        onClick={handleStopTimer}
                        disabled={!timerActive}
                    >
                        Detener
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Clockify;
