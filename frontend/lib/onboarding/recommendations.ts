import { diseaseCatalog } from "@/lib/mock/explore";
import type { MemberHealthContext } from "./types";

const DEFAULT_ROOM_IDS = ["room-before-diagnosis", "room-night-anxiety", "room-work-school"];
const DEFAULT_FEELINGS = ["不安", "眠れない", "診察前", "家族に話せない", "仕事がつらい", "治療のこと", "同じ人に聞きたい"];

const symptomRoomIds: Record<string, string[]> = {
  "abdominal-pain": ["room-abdominal-pain"],
  diarrhea: ["room-diarrhea"],
  fatigue: ["room-fatigue"],
  pain: ["room-pain"],
  numbness: ["room-numbness"],
  insomnia: ["room-insomnia", "room-night-anxiety"],
  skin: ["room-skin"],
  breathless: ["room-breathless"],
  nausea: ["room-nausea"],
  dizziness: ["room-dizziness"],
};

const concernRoomIds: Record<string, string[]> = {
  "before-diagnosis": ["room-before-diagnosis", "room-before-visit"],
  treatment: ["room-treatment"],
  money: ["room-money"],
  work: ["room-work-school"],
  school: ["room-work-school"],
  family: ["room-family-talk"],
  future: ["room-future"],
  lonely: ["room-night-anxiety"],
  "patient-group": ["room-patient-group"],
};

const topicAliases: Record<string, string[]> = {
  "強い疲れ・倦怠感": ["強い疲れ"],
  "下痢・便のトラブル": ["下痢・便のトラブル"],
  痛み: ["痛み（全身）"],
  "息切れ・息苦しさ": ["息切れ"],
  "診断前・検査待ち": ["診断前・検査待ち"],
  "治療の不安": ["治療の不安"],
  "医療費のこと": ["医療費のこと"],
  "仕事との両立": ["仕事との両立"],
  "学校・勉強との両立": ["仕事との両立"],
  "家族に話す": ["家族に話す"],
  "将来のこと": ["将来のこと"],
  "孤独・ひとりの時間": ["孤独・ひとりの時間", "夜に不安が強い"],
  患者会に行く前: ["患者会に行く前"],
};

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

function hasSelectedContext(context: MemberHealthContext) {
  return Boolean(
    context.primaryDisease ||
      context.symptoms.length > 0 ||
      context.concerns.length > 0 ||
      context.diagnosisStatus === "pending",
  );
}

export function getHealthTopicLabels(context: MemberHealthContext) {
  const labels: string[] = [];

  if (context.primaryDisease?.selectedDiseaseName) labels.push(context.primaryDisease.selectedDiseaseName);
  if (context.primaryDisease?.selectionMethod === "status" || context.diagnosisStatus === "pending") {
    labels.push("診断前・検査待ち");
  }

  for (const topic of [...context.symptoms, ...context.concerns]) {
    labels.push(topic.topicName, ...(topicAliases[topic.topicName] ?? []));
  }

  return unique(labels).filter(Boolean);
}

export function getHealthRoomIds(context: MemberHealthContext) {
  const roomIds: string[] = [];
  const disease = context.primaryDisease?.selectedDiseaseId
    ? diseaseCatalog.find((item) => item.id === context.primaryDisease?.selectedDiseaseId)
    : null;

  if (disease?.roomId) roomIds.push(disease.roomId);
  if (disease?.relatedRoomIds) roomIds.push(...disease.relatedRoomIds);

  if (context.primaryDisease?.selectionMethod === "status" || context.diagnosisStatus === "pending") {
    roomIds.push("room-before-diagnosis", "room-before-visit", "room-fatigue", "room-night-anxiety");
  }

  for (const symptom of context.symptoms) {
    if (symptom.topicId && symptomRoomIds[symptom.topicId]) roomIds.push(...symptomRoomIds[symptom.topicId]);
  }

  for (const concern of context.concerns) {
    if (concern.topicId && concernRoomIds[concern.topicId]) roomIds.push(...concernRoomIds[concern.topicId]);
  }

  if (context.primaryDisease?.selectionMethod === "free_text" && roomIds.length === 0) {
    roomIds.push("room-before-diagnosis", "room-treatment", "room-family-talk", "room-night-anxiety");
  }

  return unique(roomIds).filter(Boolean);
}

export function getHealthRecommendation(context: MemberHealthContext) {
  const hasContext = hasSelectedContext(context);
  const topicLabels = getHealthTopicLabels(context);
  const roomIds = getHealthRoomIds(context);
  const primaryName =
    context.primaryDisease?.selectedDiseaseName ??
    (context.primaryDisease?.selectionMethod === "status" || context.diagnosisStatus === "pending"
      ? "診断前・検査待ち"
      : null);
  const feelingChips = unique([...topicLabels, ...DEFAULT_FEELINGS]).slice(0, 10);

  return {
    hasContext,
    primaryName,
    topicLabels,
    roomIds: roomIds.length > 0 ? roomIds : DEFAULT_ROOM_IDS,
    feelingChips,
    roomsTitle: hasContext ? "あなたに近い入口" : "迷った時の入口",
    roomsLead: hasContext
      ? "選んだ病気・症状・不安から、近いテーマを先に並べています。"
      : "病名が決まっていなくても読みやすいテーマです。",
    homeLead: hasContext
      ? "選んだ内容に近い声を先に集めています。違う病名でも、症状や不安が近い声を混ぜています。"
      : "よく読まれている近い声を集めています。",
  };
}
