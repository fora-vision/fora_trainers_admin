export interface CourseDTO {
  id: number;
  name: string;
  description: string;
  publish: boolean;
  deadline?: number;
  invite_code?: string;
  users_count: number;
  program?: { workouts: WorkoutDTO[] };
}

export interface ExerciseRuleDTO {
  label: string;
  name: string;
  description: string;
  video_url: string;
  image_up: string;
  image_down: string;
  count: 0;
  side: "left";
}

export interface UserDTO {
  id: number;
  name: string;
  age: number;
  sex: number;
  total_time: number;
  workouts: {
    name: string;
    total_time: number;
    exercises_count: number;
    timestamp: number;
    video_url: string;
  }[];
}

export interface WorkoutDTO {
  name: string;
  sets: WorkoutSetDTO[];
}

export interface WorkoutSetDTO {
  repeats: number;
  name: string;
  exercises: ExerciseDTO[];
}

export interface ExerciseDTO {
  type: "TIME" | "REPEATS";
  modificators: ModifierDTO[];
  label: string;
  value: number;
}

export interface ModifierDTO {
  type: "SKIP" | "COMPLICATE" | "SIMPLIFY";
  body_type: null | "strong" | "normal" | "weak";
  value: number;

  min_age: number;
  max_age: number;
  sex: 1 | 2 | null;
}
