import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const MODEL_URL = "https://storage.googleapis.com/mediapipe-assets/face_landmarker.task";
const WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.12/wasm";

const ExamProctor = ({ onViolationChange, onHeadWarningChange, containerClassName }) => {
  const webcamRef = useRef(null);
  const streamRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(0);
  const activeRef = useRef(true);

  const [violations, setViolations] = useState(0);
  const [headWarning, setHeadWarning] = useState(false);
  const [modelReady, setModelReady] = useState(false);

  useEffect(() => {
    onViolationChange?.(violations);
  }, [onViolationChange, violations]);

  useEffect(() => {
    onHeadWarningChange?.(headWarning);
  }, [onHeadWarningChange, headWarning]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setViolations((current) => current + 1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const setupLandmarker = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(WASM_URL);
        if (!isMounted) {
          return;
        }

        landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: MODEL_URL,
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numFaces: 1,
          outputFaceBlendshapes: true
        });
        setModelReady(true);
      } catch (error) {
        console.error("Failed to initialize Face Landmarker", error);
      }
    };

    setupLandmarker();

    return () => {
      isMounted = false;
      landmarkerRef.current?.close?.();
    };
  }, []);

  useEffect(() => {
    if (!modelReady) {
      return undefined;
    }

    activeRef.current = true;

    const detect = () => {
      if (!activeRef.current) {
        return;
      }

      const video = webcamRef.current?.video;
      const landmarker = landmarkerRef.current;

      if (!video || !landmarker || video.readyState < 2) {
        animationRef.current = requestAnimationFrame(detect);
        return;
      }

      const result = landmarker.detectForVideo(video, performance.now());
      const categories = result?.faceBlendshapes?.[0]?.categories ?? [];
      const lookOutLeft = categories.find((item) => item.categoryName === "eyeLookOutLeft")?.score ?? 0;
      const lookOutRight = categories.find((item) => item.categoryName === "eyeLookOutRight")?.score ?? 0;
      const lookingAway = Math.max(lookOutLeft, lookOutRight) > 0.35;

      setHeadWarning(lookingAway);
      animationRef.current = requestAnimationFrame(detect);
    };

    animationRef.current = requestAnimationFrame(detect);

    return () => {
      activeRef.current = false;
      cancelAnimationFrame(animationRef.current);
    };
  }, [modelReady]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <>
      {headWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-red-900/40 backdrop-blur-sm">
          <div className="max-w-md rounded-xl bg-white p-6 text-center shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-red-500">Warning</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Keep your eyes on the screen</h2>
            <p className="mt-2 text-sm text-slate-600">
              Face tracking detected a head turn. Please face forward to continue your exam.
            </p>
          </div>
        </div>
      )}

      <div
        className={
          containerClassName ||
          "w-full overflow-hidden rounded-lg border-2 border-emerald-500 bg-slate-900 shadow-lg"
        }
      >
        <Webcam
          ref={webcamRef}
          audio={false}
          mirrored
          className="h-28 w-full object-cover"
          onUserMedia={(stream) => {
            streamRef.current = stream;
          }}
          videoConstraints={{ facingMode: "user" }}
        />
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-xs text-white">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          REC
        </div>
        <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-[10px] text-white">
          {modelReady ? "Tracking" : "Initializing"}
        </div>
      </div>
    </>
  );
};

export default ExamProctor;
