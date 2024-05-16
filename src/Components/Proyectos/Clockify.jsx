import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Clockify = () => {
    const [timerActive, setTimerActive] = useState(false);
    const [description, setDescription] = useState('');
    const [timeEntryId, setTimeEntryId] = useState(null);

    const handleStartTimer = async () => {
        try {
            if (!timerActive) {
                const startTime = new Date().toISOString();

                // Realizar la solicitud para iniciar el temporizador
                const response = await fetch(`${process.env.REACT_APP_CLOCKIFY}/time-entries`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': 'ZTU4MjEyOWItYTQ2Mi00MTNiLWFmOWUtNzQ3M2ExOTQ1M2Nk'
                    },
                    body: JSON.stringify({
                        start: startTime,
                        description: description || 'Trabajo en curso' // Usar la descripción ingresada o predeterminada
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    // Temporizador iniciado exitosamente
                    setTimerActive(true);
                    setTimeEntryId(data.id); // Guardar el ID de la entrada de tiempo
                    Swal.fire({
                        icon: 'success',
                        title: 'Temporizador Iniciado',
                        text: 'El temporizador ha sido iniciado correctamente'
                    });
                } else {
                    throw new Error('Error al iniciar el temporizador');
                }
            }
        } catch (error) {
            console.error('Error al iniciar el temporizador:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error al iniciar temporizador',
                text: 'Hubo un problema al iniciar el temporizador'
            });
        }
    };

    const handleStopTimer = async () => {
        try {
            if (timerActive && timeEntryId) {
                const endTime = new Date().toISOString();

                // Realizar la solicitud para detener el temporizador
                const response = await fetch(`${process.env.REACT_APP_CLOCKIFY}/time-entries`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': 'ZTU4MjEyOWItYTQ2Mi00MTNiLWFmOWUtNzQ3M2ExOTQ1M2Nk'
                    },
                    body: JSON.stringify({
                        end: endTime
                    })
                });

                if (response.ok) {
                    // Temporizador detenido exitosamente
                    setTimerActive(false);
                    setTimeEntryId(null);
                    Swal.fire({
                        icon: 'info',
                        title: 'Temporizador Detenido',
                        text: 'El temporizador ha sido detenido'
                    });
                } else {
                    throw new Error('Error al detener el temporizador');
                }
            }
        } catch (error) {
            console.error('Error al detener el temporizador:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error al detener temporizador',
                text: 'Hubo un problema al detener el temporizador'
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-xl mx-auto rounded-lg  p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Clockify Timer</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Descripción del temporizador"
                        className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="flex justify-between mb-4">
                    <button
                        className={`bg-custom-purple  text-white font-bold py-2 px-4 rounded ${timerActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleStartTimer}
                        disabled={timerActive}
                    >
                        {timerActive ? ' Iniciado' : 'Iniciar'}
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
