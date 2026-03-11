export type Exercise = {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  movementType: "compound" | "isolation";
};

export const EXERCISES: Exercise[] = [
  { id: "barbell-bench-press", name: "Barbell Bench Press", muscleGroup: "Chest", equipment: "Barbell", movementType: "compound" },
  { id: "incline-dumbbell-press", name: "Incline Dumbbell Press", muscleGroup: "Chest", equipment: "Dumbbells", movementType: "compound" },
  { id: "decline-bench-press", name: "Decline Bench Press", muscleGroup: "Chest", equipment: "Barbell", movementType: "compound" },
  { id: "dumbbell-fly", name: "Dumbbell Fly", muscleGroup: "Chest", equipment: "Dumbbells", movementType: "isolation" },
  { id: "cable-fly", name: "Cable Fly", muscleGroup: "Chest", equipment: "Cable", movementType: "isolation" },
  { id: "push-up", name: "Push-Up", muscleGroup: "Chest", equipment: "Bodyweight", movementType: "compound" },
  { id: "weighted-dip", name: "Weighted Dip", muscleGroup: "Chest", equipment: "Bodyweight", movementType: "compound" },
  { id: "machine-chest-press", name: "Machine Chest Press", muscleGroup: "Chest", equipment: "Machine", movementType: "compound" },
  { id: "pec-deck-fly", name: "Pec Deck Fly", muscleGroup: "Chest", equipment: "Machine", movementType: "isolation" },
  { id: "single-arm-cable-press", name: "Single-Arm Cable Press", muscleGroup: "Chest", equipment: "Cable", movementType: "compound" },

  { id: "pull-up", name: "Pull-Up", muscleGroup: "Back", equipment: "Bodyweight", movementType: "compound" },
  { id: "chin-up", name: "Chin-Up", muscleGroup: "Back", equipment: "Bodyweight", movementType: "compound" },
  { id: "lat-pulldown", name: "Lat Pulldown", muscleGroup: "Back", equipment: "Cable", movementType: "compound" },
  { id: "barbell-row", name: "Barbell Row", muscleGroup: "Back", equipment: "Barbell", movementType: "compound" },
  { id: "pendlay-row", name: "Pendlay Row", muscleGroup: "Back", equipment: "Barbell", movementType: "compound" },
  { id: "seated-cable-row", name: "Seated Cable Row", muscleGroup: "Back", equipment: "Cable", movementType: "compound" },
  { id: "single-arm-dumbbell-row", name: "Single-Arm Dumbbell Row", muscleGroup: "Back", equipment: "Dumbbells", movementType: "compound" },
  { id: "t-bar-row", name: "T-Bar Row", muscleGroup: "Back", equipment: "Machine", movementType: "compound" },
  { id: "straight-arm-pulldown", name: "Straight-Arm Pulldown", muscleGroup: "Back", equipment: "Cable", movementType: "isolation" },
  { id: "chest-supported-row", name: "Chest-Supported Row", muscleGroup: "Back", equipment: "Machine", movementType: "compound" },

  { id: "conventional-deadlift", name: "Conventional Deadlift", muscleGroup: "Legs", equipment: "Barbell", movementType: "compound" },
  { id: "romanian-deadlift", name: "Romanian Deadlift", muscleGroup: "Legs", equipment: "Barbell", movementType: "compound" },
  { id: "sumo-deadlift", name: "Sumo Deadlift", muscleGroup: "Legs", equipment: "Barbell", movementType: "compound" },
  { id: "back-squat", name: "Back Squat", muscleGroup: "Legs", equipment: "Barbell", movementType: "compound" },
  { id: "front-squat", name: "Front Squat", muscleGroup: "Legs", equipment: "Barbell", movementType: "compound" },
  { id: "goblet-squat", name: "Goblet Squat", muscleGroup: "Legs", equipment: "Dumbbells", movementType: "compound" },
  { id: "leg-press", name: "Leg Press", muscleGroup: "Legs", equipment: "Machine", movementType: "compound" },
  { id: "walking-lunge", name: "Walking Lunge", muscleGroup: "Legs", equipment: "Dumbbells", movementType: "compound" },
  { id: "bulgarian-split-squat", name: "Bulgarian Split Squat", muscleGroup: "Legs", equipment: "Dumbbells", movementType: "compound" },
  { id: "step-up", name: "Step-Up", muscleGroup: "Legs", equipment: "Dumbbells", movementType: "compound" },
  { id: "leg-extension", name: "Leg Extension", muscleGroup: "Legs", equipment: "Machine", movementType: "isolation" },
  { id: "hamstring-curl", name: "Hamstring Curl", muscleGroup: "Legs", equipment: "Machine", movementType: "isolation" },
  { id: "hack-squat", name: "Hack Squat", muscleGroup: "Legs", equipment: "Machine", movementType: "compound" },
  { id: "good-morning", name: "Good Morning", muscleGroup: "Legs", equipment: "Barbell", movementType: "compound" },
  { id: "sissy-squat", name: "Sissy Squat", muscleGroup: "Legs", equipment: "Bodyweight", movementType: "isolation" },

  { id: "barbell-overhead-press", name: "Barbell Overhead Press", muscleGroup: "Shoulders", equipment: "Barbell", movementType: "compound" },
  { id: "dumbbell-shoulder-press", name: "Dumbbell Shoulder Press", muscleGroup: "Shoulders", equipment: "Dumbbells", movementType: "compound" },
  { id: "arnold-press", name: "Arnold Press", muscleGroup: "Shoulders", equipment: "Dumbbells", movementType: "compound" },
  { id: "lateral-raise", name: "Lateral Raise", muscleGroup: "Shoulders", equipment: "Dumbbells", movementType: "isolation" },
  { id: "cable-lateral-raise", name: "Cable Lateral Raise", muscleGroup: "Shoulders", equipment: "Cable", movementType: "isolation" },
  { id: "rear-delt-fly", name: "Rear Delt Fly", muscleGroup: "Shoulders", equipment: "Dumbbells", movementType: "isolation" },
  { id: "face-pull", name: "Face Pull", muscleGroup: "Shoulders", equipment: "Cable", movementType: "isolation" },
  { id: "upright-row", name: "Upright Row", muscleGroup: "Shoulders", equipment: "Barbell", movementType: "compound" },
  { id: "machine-shoulder-press", name: "Machine Shoulder Press", muscleGroup: "Shoulders", equipment: "Machine", movementType: "compound" },
  { id: "front-raise", name: "Front Raise", muscleGroup: "Shoulders", equipment: "Dumbbells", movementType: "isolation" },

  { id: "barbell-curl", name: "Barbell Curl", muscleGroup: "Biceps", equipment: "Barbell", movementType: "isolation" },
  { id: "incline-dumbbell-curl", name: "Incline Dumbbell Curl", muscleGroup: "Biceps", equipment: "Dumbbells", movementType: "isolation" },
  { id: "hammer-curl", name: "Hammer Curl", muscleGroup: "Biceps", equipment: "Dumbbells", movementType: "isolation" },
  { id: "preacher-curl", name: "Preacher Curl", muscleGroup: "Biceps", equipment: "Machine", movementType: "isolation" },
  { id: "cable-curl", name: "Cable Curl", muscleGroup: "Biceps", equipment: "Cable", movementType: "isolation" },
  { id: "concentration-curl", name: "Concentration Curl", muscleGroup: "Biceps", equipment: "Dumbbells", movementType: "isolation" },
  { id: "reverse-curl", name: "Reverse Curl", muscleGroup: "Biceps", equipment: "Barbell", movementType: "isolation" },
  { id: "zottman-curl", name: "Zottman Curl", muscleGroup: "Biceps", equipment: "Dumbbells", movementType: "isolation" },

  { id: "close-grip-bench-press", name: "Close-Grip Bench Press", muscleGroup: "Triceps", equipment: "Barbell", movementType: "compound" },
  { id: "skull-crusher", name: "Skull Crusher", muscleGroup: "Triceps", equipment: "Barbell", movementType: "isolation" },
  { id: "cable-triceps-pushdown", name: "Cable Triceps Pushdown", muscleGroup: "Triceps", equipment: "Cable", movementType: "isolation" },
  { id: "overhead-triceps-extension", name: "Overhead Triceps Extension", muscleGroup: "Triceps", equipment: "Dumbbells", movementType: "isolation" },
  { id: "bench-dip", name: "Bench Dip", muscleGroup: "Triceps", equipment: "Bodyweight", movementType: "compound" },
  { id: "single-arm-cable-extension", name: "Single-Arm Cable Extension", muscleGroup: "Triceps", equipment: "Cable", movementType: "isolation" },
  { id: "machine-triceps-extension", name: "Machine Triceps Extension", muscleGroup: "Triceps", equipment: "Machine", movementType: "isolation" },

  { id: "barbell-hip-thrust", name: "Barbell Hip Thrust", muscleGroup: "Glutes", equipment: "Barbell", movementType: "compound" },
  { id: "glute-bridge", name: "Glute Bridge", muscleGroup: "Glutes", equipment: "Bodyweight", movementType: "compound" },
  { id: "cable-kickback", name: "Cable Kickback", muscleGroup: "Glutes", equipment: "Cable", movementType: "isolation" },
  { id: "smith-machine-hip-thrust", name: "Smith Machine Hip Thrust", muscleGroup: "Glutes", equipment: "Machine", movementType: "compound" },
  { id: "frog-pump", name: "Frog Pump", muscleGroup: "Glutes", equipment: "Bodyweight", movementType: "isolation" },
  { id: "curtsy-lunge", name: "Curtsy Lunge", muscleGroup: "Glutes", equipment: "Dumbbells", movementType: "compound" },

  { id: "standing-calf-raise", name: "Standing Calf Raise", muscleGroup: "Calves", equipment: "Machine", movementType: "isolation" },
  { id: "seated-calf-raise", name: "Seated Calf Raise", muscleGroup: "Calves", equipment: "Machine", movementType: "isolation" },
  { id: "donkey-calf-raise", name: "Donkey Calf Raise", muscleGroup: "Calves", equipment: "Machine", movementType: "isolation" },
  { id: "single-leg-calf-raise", name: "Single-Leg Calf Raise", muscleGroup: "Calves", equipment: "Bodyweight", movementType: "isolation" },

  { id: "plank", name: "Plank", muscleGroup: "Core", equipment: "Bodyweight", movementType: "isolation" },
  { id: "side-plank", name: "Side Plank", muscleGroup: "Core", equipment: "Bodyweight", movementType: "isolation" },
  { id: "hanging-leg-raise", name: "Hanging Leg Raise", muscleGroup: "Core", equipment: "Bodyweight", movementType: "compound" },
  { id: "ab-wheel-rollout", name: "Ab Wheel Rollout", muscleGroup: "Core", equipment: "Bodyweight", movementType: "compound" },
  { id: "cable-crunch", name: "Cable Crunch", muscleGroup: "Core", equipment: "Cable", movementType: "isolation" },
  { id: "russian-twist", name: "Russian Twist", muscleGroup: "Core", equipment: "Bodyweight", movementType: "isolation" },
  { id: "dead-bug", name: "Dead Bug", muscleGroup: "Core", equipment: "Bodyweight", movementType: "isolation" },
  { id: "bird-dog", name: "Bird Dog", muscleGroup: "Core", equipment: "Bodyweight", movementType: "isolation" },
  { id: "decline-sit-up", name: "Decline Sit-Up", muscleGroup: "Core", equipment: "Bodyweight", movementType: "isolation" },
  { id: "toes-to-bar", name: "Toes-to-Bar", muscleGroup: "Core", equipment: "Bodyweight", movementType: "compound" },

  { id: "dumbbell-shrug", name: "Dumbbell Shrug", muscleGroup: "Traps", equipment: "Dumbbells", movementType: "isolation" },
  { id: "barbell-shrug", name: "Barbell Shrug", muscleGroup: "Traps", equipment: "Barbell", movementType: "isolation" },
  { id: "farmer-carry", name: "Farmer Carry", muscleGroup: "Traps", equipment: "Dumbbells", movementType: "compound" },
  { id: "snatch-grip-high-pull", name: "Snatch-Grip High Pull", muscleGroup: "Traps", equipment: "Barbell", movementType: "compound" },

  { id: "wrist-curl", name: "Wrist Curl", muscleGroup: "Forearms", equipment: "Dumbbells", movementType: "isolation" },
  { id: "reverse-wrist-curl", name: "Reverse Wrist Curl", muscleGroup: "Forearms", equipment: "Dumbbells", movementType: "isolation" },
  { id: "plate-pinch-hold", name: "Plate Pinch Hold", muscleGroup: "Forearms", equipment: "Bodyweight", movementType: "isolation" },
  { id: "towel-pull-up", name: "Towel Pull-Up", muscleGroup: "Forearms", equipment: "Bodyweight", movementType: "compound" },

  { id: "burpee", name: "Burpee", muscleGroup: "Cardio", equipment: "Bodyweight", movementType: "compound" },
  { id: "mountain-climber", name: "Mountain Climber", muscleGroup: "Cardio", equipment: "Bodyweight", movementType: "compound" },
  { id: "jump-rope", name: "Jump Rope", muscleGroup: "Cardio", equipment: "Bodyweight", movementType: "compound" },
  { id: "rower-interval", name: "Rower Interval", muscleGroup: "Cardio", equipment: "Machine", movementType: "compound" },
  { id: "assault-bike-sprint", name: "Assault Bike Sprint", muscleGroup: "Cardio", equipment: "Machine", movementType: "compound" },
  { id: "treadmill-incline-walk", name: "Treadmill Incline Walk", muscleGroup: "Cardio", equipment: "Machine", movementType: "compound" },

  { id: "power-clean", name: "Power Clean", muscleGroup: "Full Body", equipment: "Barbell", movementType: "compound" },
  { id: "clean-and-press", name: "Clean and Press", muscleGroup: "Full Body", equipment: "Barbell", movementType: "compound" },
  { id: "thruster", name: "Thruster", muscleGroup: "Full Body", equipment: "Dumbbells", movementType: "compound" },
  { id: "kettlebell-swing", name: "Kettlebell Swing", muscleGroup: "Full Body", equipment: "Kettlebell", movementType: "compound" },
  { id: "turkish-get-up", name: "Turkish Get-Up", muscleGroup: "Full Body", equipment: "Kettlebell", movementType: "compound" },
  { id: "wall-ball-shot", name: "Wall Ball Shot", muscleGroup: "Full Body", equipment: "Bodyweight", movementType: "compound" },

  { id: "neck-flexion", name: "Neck Flexion", muscleGroup: "Neck", equipment: "Machine", movementType: "isolation" },
  { id: "neck-extension", name: "Neck Extension", muscleGroup: "Neck", equipment: "Machine", movementType: "isolation" },
  { id: "lateral-neck-flexion", name: "Lateral Neck Flexion", muscleGroup: "Neck", equipment: "Machine", movementType: "isolation" },

  { id: "worlds-greatest-stretch", name: "World's Greatest Stretch", muscleGroup: "Mobility", equipment: "Bodyweight", movementType: "compound" },
  { id: "cat-cow", name: "Cat-Cow", muscleGroup: "Mobility", equipment: "Bodyweight", movementType: "isolation" },
  { id: "thoracic-rotation", name: "Thoracic Rotation", muscleGroup: "Mobility", equipment: "Bodyweight", movementType: "isolation" },
  { id: "band-pull-apart", name: "Band Pull-Apart", muscleGroup: "Mobility", equipment: "Bodyweight", movementType: "isolation" },
  { id: "hip-flexor-stretch", name: "Hip Flexor Stretch", muscleGroup: "Mobility", equipment: "Bodyweight", movementType: "isolation" },
];

export const EXERCISE_GROUPS = Array.from(
  new Set(EXERCISES.map((exercise) => exercise.muscleGroup)),
);
