// This Component acts as a drawing tool.
// Code largely imported from previous etool project

import React, {useEffect, useRef, useState} from "react";
import BackGround from '../../SpaceBackground.jpg'

function Interpreter() {
    //The State of the drawing tool

    //The Shadow of the cursor, shows what will happen when drawing:
    const shadowRef = useRef(null);
    const shadowContextRef= useRef(null);

    //The Drawing Canvas Reference
    const canvasRef = useRef(null);
    const contextRef= useRef(null);

    //The Lower Layer Map Reference
    const mapRef = useRef(null);
    const mapContextRef= useRef(null);

    //Merged Canvases Reference
    const myAnswer = document.querySelector("#mapID");

    //const canvasURI = canvasRef.current
    //Check the button is pressed
    const [isDrawing, setIsDrawing] = useState(false);

    //State for the Style
    const [toolStyle, setToolStyle] = useState("Line");


    //Use Effect Hook
    useEffect(() => {
        //The Bottom Layer with the BackGround
        initCanvas(mapRef, mapContextRef);
        clearMap(mapRef);
        
        //Middle Layer, Where the drawing till be made. Identical to Map Layer.
        initCanvas(canvasRef, contextRef);

        //Top Layer, shows the position of the tool. Identical to drawing layer.
        initCanvas(shadowRef, shadowContextRef);

        //Set the Markers initial properties
        toggleMarker()

    },[])

    //The Images Width and Height
    const canvasHeight = window.innerHeight*0.895;
    //0.938 is the background height / width. Keeps the dimensions
    const canvasWidth = canvasHeight * 0.938;

    const initCanvas = (canvasRef, contextRef) => {
        const canvas = canvasRef.current;
        canvas.height = window.innerHeight*0.895;
        canvas.width = canvas.height * 0.938;
        canvas.style.width = `${canvas.width}px` ;
        canvas.style.height = `${canvas.height}px` ;

        //Define the 2d context.
        contextRef.current = canvas.getContext("2d");
    }


    //Drawing method. On mouse down.
    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        setIsDrawing(true);

        switch (toolStyle){
            case "Erase":{
                EraseOnCanvas(contextRef, offsetX, offsetY);
                return;
            }
            default: {
                //Default is a line.
                contextRef.current.beginPath();
                contextRef.current.moveTo(offsetX, offsetY);
                break;
            }
        }
    }

    //Drawing method. On mouse down.
    const endDrawing = () => {
        setIsDrawing(false)

        if(toolStyle==="City"){return;}
        if(toolStyle==="Stamp"){return;}

        contextRef.current.closePath()
    }

    //Drawing method. On mouse move.
    const drawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;

        //Clear the shadow context
        clearCanvas(shadowRef);

        if(!isDrawing){
            hover(offsetX, offsetY);
            return
        }

        //Behaviour changes depending ot tool state.
        switch(toolStyle){
            case "Line": {
                contextRef.current.lineTo(offsetX, offsetY)
                contextRef.current.stroke()
                break;
            }
            case "Erase": {
                EraseOnCanvas(contextRef, offsetX, offsetY);
                return;
            }
            default: {
                return;
            }
        }
    }

    //Drawing method. On mouse leave canvas.
    const stopDrawing = () =>{
        endDrawing();
        clearCanvas(shadowRef);
    }

    //Hovering method. On mouse move.
    const hover = (offsetX, offsetY) => {
        switch (toolStyle){
            case "Line": {
                shadowContextRef.current.beginPath();
                shadowContextRef.current.moveTo(offsetX, offsetY);
                shadowContextRef.current.lineTo(offsetX, offsetY);
                shadowContextRef.current.stroke();
                shadowContextRef.current.closePath();
                break;
            }
            case "Erase":{
                shadowContextRef.current.strokeRect(offsetX-10, offsetY-10, 20, 20);
                break;
            }
            default:{
                break;
            }
        }
    }

    const toggleMarker = () => {
        //Return the drawing settings to normal
        contextRef.current.lineCap = "round";
        contextRef.current.strokeStyle = "black";
        contextRef.current.lineWidth = 22;

        //Return the hover settings to normal
        shadowContextRef.current.lineCap = "round";
        shadowContextRef.current.strokeStyle = "black";
        shadowContextRef.current.lineWidth = 25;

        setToolStyle("Line");
    }

    const EraseOnCanvas = (contextRef, offsetX, offsetY) => {
        contextRef.current.clearRect(offsetX-10, offsetY-15, 20, 30);
    }

    const clearCanvas = (canvasRef) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    const clearMap = (canvasRef) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height)
    }

    //On Button Press Method
    const clearDrawing = () => {
        clearCanvas(canvasRef);
        clearMap(mapRef)
    }

    const mergeImage = () => {
        //Merges the Top And Bottom Canvas Layers
        const map = mapRef.current;
        const mapContext = map.getContext("2d");

        //Retrieve the Drawing
        const canvas = canvasRef.current;

        //Draw the canvas image onto of the map.
        mapContext.drawImage(canvas, 0, 0, map.width, map.height);
    }

    const downloadImage = () => {
        //First Merge the Images
        mergeImage();

        //Html Anchor Element
        const element = document.createElement("a");
        document.body.appendChild(element);
        element.href = myAnswer.toDataURL();
        element.download  = "Question2.png";
        element.click();
        document.body.removeChild(element);

    }


    return (
        <div
            style={{
                width: '80%',
                //height: '50%',
                position: 'relative',
                // left: '9%'
            }}
        >

            <img //Background
                alt={BackGround}
                src={BackGround}
                style={{
                    zIndex: '4'
                }}
            >
            </img>

            <div// The Tool Buttons Above the Canvas
                //ToDo: Minimum Bar Size.
                style={{
                    left: '-9%',
                    height: '41px',
                    width: canvasWidth,
                    position: 'absolute'
                }}
            >
                <button
                    style = {{
                        left: '0%',
                        top:'+10%',
                        border: "2px solid red",
                        position: 'absolute'
                    }}
                    type="button"
                    id={"btnClear"}
                    onClick={clearDrawing}
                >Clear</button>
            </div>

            <p  //The Question Instructions
                style={{
                    top: '-40px',
                    left: '47.5%',
                    width: '60%',
                    position: 'absolute',
                    align: 'left',
                    fontSize: 50
                }}>
                <h2>Draw a Number</h2>

                <button style={{height: '200px', width: '800px', fontSize: 50}}
                        type="button" id="btnDownload" onClick={downloadImage}
                >Download</button>
            </p>


            <div
                style={{

                    position: 'absolute',
                    left: '-9%',
                    top: '40px',
                }}>

                <canvas
                    id="canvasID"
                    ref={canvasRef}
                    style={{
                        border: "5px solid black",
                        position: 'absolute',
                        zIndex: '2'
                    }}
                />

                <canvas
                    id="drawShadowID"
                    onMouseDown={startDrawing}
                    onMouseUp={endDrawing}
                    onMouseMove={drawing}
                    onMouseOut={stopDrawing}
                    ref={shadowRef}
                    style={{
                        position: 'absolute',
                        zIndex: '3'
                    }}
                />

                <canvas
                    id="mapID"
                    ref={mapRef}
                    style={{
                        position: 'absolute',
                        zIndex: '1'
                    }}
                />
            </div>
        </div>
    );
}

export default Interpreter;
