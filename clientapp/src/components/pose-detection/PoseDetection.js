import { Center, Flex } from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";
import React, { useEffect, useState, useRef } from "react";
import "@tensorflow/tfjs-backend-webgl";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as poseDetection from "@tensorflow-models/pose-detection";

import "./PoseDetection.css";
import { POSES } from "./Poses";
import { POINTS } from "./Points";
import { CONNECTIONS } from "./Connections";
import { landmarks_to_embedding } from "./pose_utils";
import { drawPoint, drawSegment, scaleKeypoint } from "./canvas_utils";

const colors = theme.colors;

let interval;
let skeletonColor = "rgb(255,0,0)";

export default function PoseDetection() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [isRunning, setIsRunning] = useState(false);
  const [squatCount, setSquatCount] = useState(0); // Start with no squats
  const [previousPose, setPreviousPose] = useState("No_Pose"); // Start with no pose
  const [currentPose, setCurrentPose] = useState("No_Pose"); // Start with no pose

  // Change current pose upon pose detection, and then update previous pose
  // In order for a squat to count, it must go from Squat_Down to Squat_Up or Squad_Up to Squat_Down

  useEffect(() => {
    tf.ready().then(() => {
      console.log("TF ready");
    });
  }, []);

  const runMovenet = async () => {
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
    };
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      detectorConfig
    );
    const poseClassifier = await tf.loadLayersModel(
      "https://models.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json"
    );
    interval = setInterval(() => {
      detectPose(detector, poseClassifier);
    }, 100);
  };

  const detectPose = async (detector, poseClassifier) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      let notDetected = 0;
      const video = webcamRef.current.video;
      const pose = await detector.estimatePoses(video);
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      try {
        const keypoints = pose[0].keypoints;
        for (let i = 0; i < keypoints.length; i++) {
          keypoints[i] = scaleKeypoint(keypoints[i], video);
        }
        let input = keypoints.map((keypoint) => {
          if (keypoint.score > 0.4) {
            if (
              !(keypoint.name === "left_eye" || keypoint.name === "right_eye")
            ) {
              const [x, y] = [keypoint.x, keypoint.y];
              drawPoint(ctx, x, y, 8, "rgb(0,0,0)");
              let connections = CONNECTIONS[keypoint.name];
              try {
                connections.forEach((connection) => {
                  let conName = connection.toUpperCase();
                  drawSegment(
                    ctx,
                    [x, y],
                    [
                      keypoints[POINTS[conName]].x,
                      keypoints[POINTS[conName]].y,
                    ],
                    skeletonColor
                  );
                });
              } catch (err) {}
            }
          } else {
            notDetected += 1;
          }
          return [keypoint.x, keypoint.y];
        });
        if (notDetected > 4) {
          skeletonColor = "rgb(255,0,0)";
          return;
        }
        const processedInput = landmarks_to_embedding(input);
        const classification = poseClassifier.predict(processedInput);

        // classification.array().then((data) => {
        //   const classNo = POSES[currentPose];
        //   console.log(data[0][classNo]);
        //   if (data[0][classNo] > 0.97) {
        //     VALID POSE, INVERT THE NEXT SQUAT POSITION AND INCREMENT COUNTER
        //     skeletonColor = "rgb(0,255,0)";
        //   } else {
        //     INVALID POSE, SET PREVIOUS TO NO_POSE AND INVERT THE NEXT SQUAT POSITION
        //     skeletonColor = "rgb(255,255,255)";
        //   }
        // });
      } catch (err) {
        console.log(err);
      }
    }
  };

  function startTracking() {
    setIsRunning(true);
    runMovenet();
  }

  function stopTracking() {
    clearInterval(interval);
    setIsRunning(false);
  }

  // MODIFY THESE SIZES TO MATCH YOUR WEBCAM/CAMERA RESOLUTION
  if (isRunning) {
    return (
      <>
        <Webcam
          width="1920px"
          height="1080px"
          id="webcam"
          ref={webcamRef}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            padding: "0px",
          }}
        />
        <canvas
          ref={canvasRef}
          id="canvas"
          width="1920px"
          height="1080px"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 1,
          }}
        ></canvas>
        <button onClick={stopTracking}>Stop Pose Detection</button>
      </>
    );
  }

  return <button onClick={startTracking}>Start Pose Detection</button>;
}
