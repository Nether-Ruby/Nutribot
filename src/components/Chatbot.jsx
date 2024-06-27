import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { useState, useEffect, useRef } from 'react';
import '../styles/Chatbot.css'; // Importar el archivo de estilos CSS
import config from "../../configs";
const { VITE_API_KEY } = config;


const apiKey = VITE_API_KEY;


if (!apiKey) {
    console.error("API key is missing. Please add your API key to the .env file.");
    alert("API key is missing. Please add your API key to the .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
];

const generationConfig = {
    maxOutputTokens: 500,  // Aumentar el límite de tokens
    temperature: 0,  // Ajustar la temperatura para diversidad en las respuestas
    topP: 0.9,  // Ajustar topP para mayor diversidad
    topK: 10,  // Ajustar topK para mayor diversidad
};

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig,
    safetySettings
});

const Chatbot = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const [userProfile, setUserProfile] = useState({
        age: '',
        gender: '',
        weight: '',
        height: '',
        activityLevel: '',
        dietaryPreferences: '',
        healthGoals: ''
    });
    const bottomRef = useRef(null);

    const handleSetMessage = (event) => setMessage(event.target.value);

    const handleSetUserProfile = (key, value) => {
        setUserProfile((prevProfile) => ({
            ...prevProfile,
            [key]: value
        }));
    };

    const chat = model.startChat({ history: [] });

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (!loading) {
            scrollToBottom();
        }
    }, [loading]);

    const addMessageToHistory = (role, message) => {
        setChatHistory((prevHistory) => [...prevHistory, { role, parts: message }]);
    };

    const sanitizeResponse = (text) => {
        return text
            .replace(/\n/g, "<br />")
            .replace(/"/g, "")
            .replace(/\*([^*]+)\*/g, "<h3>$1</h3>")
            .replace(/<h3><br \/><\/h3>/g, "");
    };

    const fetchData = async () => {
        if (!message.trim()) {
            alert("Por favor escribe tu consulta");
            return;
        }

        if (Object.values(userProfile).some(value => !value.trim())) {
            alert("Por favor completa la informacion de perfil");
            return;
        }

        try {
            setLoading(true);
            addMessageToHistory("user", message);

            const userContext = `
            Eres el Encargado de resolver dudas sobre nutrición para los usuarios.
            En esta pestaña, tu trabajo será resolver dudas acerca de temas nutritivos.

            Perfil del Usuario:
            - Edad: ${userProfile.age}
            - Género: ${userProfile.gender}
            - Peso: ${userProfile.weight}
            - Altura: ${userProfile.height}
            - Nivel de actividad: ${userProfile.activityLevel}
            - Preferencias dietéticas: ${userProfile.dietaryPreferences}
            - Objetivos de salud: ${userProfile.healthGoals}

            Consulta del Usuario:
            ${message}

            Tu tarea es proporcionar una respuesta clara, precisa y útil que aborde la consulta del usuario sobre nutrición. Ten en cuenta la información del perfil del usuario para personalizar tu recomendación. Asegúrate de que la respuesta sea informativa y fácil de entender, y que promueva hábitos alimenticios saludables.

            Ejemplo de una buena respuesta:
            "Hola [nombre del usuario], dado tu [nivel de actividad] y tu objetivo de [objetivos de salud], te recomendaría incluir más [alimentos/nutrientes] en tu dieta. Estos pueden ayudarte a alcanzar tus objetivos de manera efectiva. Aquí tienes algunas sugerencias específicas: [sugerencias]. Además, asegúrate de mantener una hidratación adecuada y consultar a un nutricionista para una orientación personalizada."

            Ahora, por favor proporciona tu respuesta.
            `;

            const result = await chat.sendMessage(userContext);
            const response = await result.response;
            const text = await response.text();

            addMessageToHistory("model", sanitizeResponse(text));

            setMessage("");
        } catch (error) {
            console.error("Error fetching data: ", error);
            alert("There was an error generating the response. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        fetchData();
    };

    return (
        <div className="chatbot-container">
            <div className="chatbox">
                <div className="chatbox-messages">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.role}`}>
                            <div dangerouslySetInnerHTML={{ __html: msg.parts }} />
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>
                <form className="chatbox-form" onSubmit={handleSubmit}>
                    <textarea
                        className="chatbox-input"
                        value={message}
                        onChange={handleSetMessage}
                        placeholder="Escribe tu consulta aqui . . ."
                    />
                    <button className="chatbox-submit" type="submit">
                        Enviar
                    </button>
                </form>
            </div>
            <div className="user-profile">
                <h3>Perfil de Usuario</h3>
                <input
                    type="text"
                    placeholder="Edad"
                    onChange={(e) => handleSetUserProfile('age', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Genero"
                    onChange={(e) => handleSetUserProfile('gender', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Peso"
                    onChange={(e) => handleSetUserProfile('weight', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Altura"
                    onChange={(e) => handleSetUserProfile('height', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nivel de Actividad"
                    onChange={(e) => handleSetUserProfile('activityLevel', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Preferencias Dieteticas"
                    onChange={(e) => handleSetUserProfile('dietaryPreferences', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Objetivos de salud"
                    onChange={(e) => handleSetUserProfile('healthGoals', e.target.value)}
                />
            </div>
        </div>
    );
};

export default Chatbot;