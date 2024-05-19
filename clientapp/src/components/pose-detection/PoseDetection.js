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

	const [isRunning, setIsRunning] = useState(true);
	const [repCount, setRepCount] = useState(0); // Start with 0 reps
	const [previousState, setPreviousState] = useState(false);
	const [isRepping, setIsRepping] = useState(false); // Start with no action

	useEffect(() => {
		tf.ready().then(() => {
			console.log("TF ready");
      runMovenet();
		});
	}, []);

	useEffect(() => {
		if (!isRunning) {
			return;
		}

		// console.log("isRepping: ", isRepping);
		// console.log("previousState: ", previousState);
		if (isRepping && !previousState) {
			setPreviousState(isRepping);
		} else if (!isRepping && previousState) {
			setPreviousState(false);
			setRepCount(repCount + 1);
			console.log("Rep Count: ", repCount);
		}
	}, [isRunning, isRepping, previousState, repCount]);

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

				classification.array().then((data) => {
					const classNo = 0;
					if (data[0][classNo] > 0.5) {
						setIsRepping(true);
						skeletonColor = "rgb(0,255,0)";
					} else {
						setIsRepping(false);
						skeletonColor = "rgb(255,0,0)";
					}
				});
			} catch (err) {
				console.log(err);
			}
		}
	};

	// MODIFY THESE SIZES TO MATCH YOUR WEBCAM/CAMERA RESOLUTION
	// Console log the video element on properties [videoWidth, videoHeight] to see your resolution and then set both the Webcam and Canvas to that resolution
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
		</>
	);
}
