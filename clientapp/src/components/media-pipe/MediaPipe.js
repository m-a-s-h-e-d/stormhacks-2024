import {
	Center,
	Flex,
} from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";
import React, { useEffect, useState, useRef } from "react";
import "./MediaPipe.css";
import { FilesetResolver, PoseLandmarker } from "@mediapipe/tasks-vision";

const colors = theme.colors;

export const MEDIA_PIPE_STATE = {
	VISION: null,
	POSE_LANDMARKER: null,
	VIDEO_TIME: -1,
	CAMERA_ON: false,
};

export default function MediaPipe() {
	const [visionState, setVisionState] = useState(MEDIA_PIPE_STATE.VISION);
	const [poseLandmarkerState, setPoseLandmarkerState] = useState(MEDIA_PIPE_STATE.POSE_LANDMARKER);
	const [lastVideoTimeState, setLastVideoTimeState] = useState(MEDIA_PIPE_STATE.VIDEO_TIME);
	const [cameraOnState, setCameraOnState] = useState(MEDIA_PIPE_STATE.CAMERA_ON);
	const video = useRef();

	useEffect(() => {
		FilesetResolver.forVisionTasks(
			"https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
		).then((vision) => {
			setVisionState(vision);
		});
	}, []);

	useEffect(() => {
		if (!visionState) {
			return;
		}
		PoseLandmarker.createFromOptions(
			visionState,
			{
				baseOptions: {
					modelAssetPath: "/models/pose_landmarker_lite.task",
					delegate: "GPU",
				},
				runningMode: "VIDEO",
			}
		).then((landmarker) => {
			setPoseLandmarkerState(landmarker);
		});
	}, [visionState]);

	function renderLoop() {
		const currentTime = video.current.currentTime;
		console.log(video.current);
		if (currentTime !== lastVideoTimeState) {
			const poseLandmarkerResult = poseLandmarkerState.detectForVideo(video.current);
			console.log(poseLandmarkerResult);
			setLastVideoTimeState(currentTime);
		}

		if (cameraOnState) {
			requestAnimationFrame(() => {
				renderLoop();
			});
		}
	}

	function toggleCam() {
		if (cameraOnState) {
			setCameraOnState(false);
			return;
		}
		
		navigator.mediaDevices
			.getUserMedia({
				video: true,
			})
			.then((stream) => {
				video.current.srcObject = stream;
				setCameraOnState(true);
			});
			
		requestAnimationFrame(() => {
			renderLoop();
		});
	}

	return (
		<Center>
			<Flex
				alignItems="center"
				justifyContent="center"
				width="100%"
				height="100vh"
				backgroundColor={colors.gray[100]}
			>
				<video id="video-output" ref={video} autoPlay playsInline></video>
				<button onClick={toggleCam}>Enable Camera</button>
			</Flex>
		</Center>
	);
}
