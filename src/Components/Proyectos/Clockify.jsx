import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Clockify = () => {
    const [timerActive, setTimerActive] = useState(false);

    const handlesStartedTimer = async () => {
        try {
            if (!timerActive) {
                const startTime = new Date().toISOString();

                // Realizar la solicitud para iniciar el temporizador
                const response = await fetch(`${process.env.REACT_APP_CLOCKIFY}/${process.env.REACT_APP_API_KEY}/time-entries`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': process.env.REACT_APP_API_KEY
                    },
                    body: JSON.stringify({
                        start: startTime,
                        description: 'Trabajo en curso'
                    })
                });

                if (response.ok) {
                    // Temporizador iniciado exitosamente
                    setTimerActive(true);
                } else {
                    throw new Error('Error al iniciar el temporizador');
                }
            }
        } catch (error) {
            console.error('Error al iniciar el temporizador:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error al inicio de temporizador',
                text: ('Error al iniciar el temporizador')
              });         }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Clockify Timer</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Descripción del temporizador"
                        className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded"
                    />
                </div>
                <div className="flex justify-between mb-4">
                    <button
                        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${timerActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handlesStartedTimer}
                        disabled={timerActive}
                    >
                        {timerActive ? 'Temporizador Iniciado' : 'Iniciar'}
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                        Detener 
                    </button>
                </div>
                {timerActive && (
                    <p className="text-green-500 font-bold">Temporizador iniciado correctamente</p>
                )}
            </div>
        </div>
    );
};

export default Clockify;
