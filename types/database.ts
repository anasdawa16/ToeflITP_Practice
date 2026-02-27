/**
 * ToeflMaster ITP — Supabase Database Types
 * Matches 001_initial_schema.sql
 * Includes Relationships: [] required by @supabase/ssr v2
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          email: string;
          avatar_url: string | null;
          target_score: number;
          test_date: string | null;
          study_streak: number;
          last_active: string;
          onboarding_completed: boolean;
          current_level: "beginner" | "intermediate" | "advanced";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          full_name?: string | null;
          email: string;
          avatar_url?: string | null;
          target_score?: number;
          test_date?: string | null;
          study_streak?: number;
          last_active?: string;
          onboarding_completed?: boolean;
          current_level?: "beginner" | "intermediate" | "advanced";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          username?: string | null;
          full_name?: string | null;
          email?: string;
          avatar_url?: string | null;
          target_score?: number;
          test_date?: string | null;
          study_streak?: number;
          last_active?: string;
          onboarding_completed?: boolean;
          current_level?: "beginner" | "intermediate" | "advanced";
          updated_at?: string;
        };
        Relationships: [];
      };

      passages: {
        Row: {
          id: string;
          title: string | null;
          content: string;
          topic: "science" | "history" | "social_science" | "arts" | "business" | "technology" | null;
          word_count: number | null;
          difficulty: number | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title?: string | null;
          content: string;
          topic?: "science" | "history" | "social_science" | "arts" | "business" | "technology" | null;
          word_count?: number | null;
          difficulty?: number | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          title?: string | null;
          content?: string;
          topic?: "science" | "history" | "social_science" | "arts" | "business" | "technology" | null;
          word_count?: number | null;
          difficulty?: number | null;
          is_active?: boolean;
        };
        Relationships: [];
      };

      audio_conversations: {
        Row: {
          id: string;
          section_part: "A" | "B" | "C";
          title: string | null;
          audio_url: string;
          transcript: string | null;
          duration_seconds: number | null;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          section_part: "A" | "B" | "C";
          title?: string | null;
          audio_url: string;
          transcript?: string | null;
          duration_seconds?: number | null;
          is_active?: boolean;
        };
        Update: {
          section_part?: "A" | "B" | "C";
          title?: string | null;
          audio_url?: string;
          transcript?: string | null;
          duration_seconds?: number | null;
          is_active?: boolean;
        };
        Relationships: [];
      };

      questions: {
        Row: {
          id: string;
          section: number;
          part: string | null;
          question_text: string;
          option_a: string;
          option_b: string;
          option_c: string;
          option_d: string;
          correct_answer: "A" | "B" | "C" | "D";
          explanation: string;
          difficulty: number | null;
          topic_tags: string[] | null;
          passage_id: string | null;
          audio_url: string | null;
          conversation_group_id: string | null;
          question_order_in_group: number | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          section: number;
          part?: string | null;
          question_text: string;
          option_a: string;
          option_b: string;
          option_c: string;
          option_d: string;
          correct_answer: "A" | "B" | "C" | "D";
          explanation: string;
          difficulty?: number | null;
          topic_tags?: string[] | null;
          passage_id?: string | null;
          audio_url?: string | null;
          conversation_group_id?: string | null;
          question_order_in_group?: number | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          section?: number;
          part?: string | null;
          question_text?: string;
          option_a?: string;
          option_b?: string;
          option_c?: string;
          option_d?: string;
          correct_answer?: "A" | "B" | "C" | "D";
          explanation?: string;
          difficulty?: number | null;
          topic_tags?: string[] | null;
          passage_id?: string | null;
          audio_url?: string | null;
          conversation_group_id?: string | null;
          question_order_in_group?: number | null;
          is_active?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "questions_passage_id_fkey";
            columns: ["passage_id"];
            isOneToOne: false;
            referencedRelation: "passages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "questions_conversation_group_id_fkey";
            columns: ["conversation_group_id"];
            isOneToOne: false;
            referencedRelation: "audio_conversations";
            referencedColumns: ["id"];
          },
        ];
      };

      test_sessions: {
        Row: {
          id: string;
          user_id: string;
          test_type: "full_mock" | "section_practice" | "timed_drill" | "quick_quiz";
          status: "in_progress" | "completed" | "abandoned";
          current_section: number;
          current_question_index: number;
          s1_time_remaining: number;
          s2_time_remaining: number;
          s3_time_remaining: number;
          s1_raw_score: number;
          s2_raw_score: number;
          s3_raw_score: number;
          s1_scaled_score: number | null;
          s2_scaled_score: number | null;
          s3_scaled_score: number | null;
          total_scaled_score: number | null;
          s1_question_ids: string[] | null;
          s2_question_ids: string[] | null;
          s3_question_ids: string[] | null;
          started_at: string;
          completed_at: string | null;
          total_duration_seconds: number | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          test_type: "full_mock" | "section_practice" | "timed_drill" | "quick_quiz";
          status?: "in_progress" | "completed" | "abandoned";
          current_section?: number;
          current_question_index?: number;
          s1_time_remaining?: number;
          s2_time_remaining?: number;
          s3_time_remaining?: number;
          s1_raw_score?: number;
          s2_raw_score?: number;
          s3_raw_score?: number;
          s1_question_ids?: string[] | null;
          s2_question_ids?: string[] | null;
          s3_question_ids?: string[] | null;
          started_at?: string;
        };
        Update: {
          status?: "in_progress" | "completed" | "abandoned";
          current_section?: number;
          current_question_index?: number;
          s1_time_remaining?: number;
          s2_time_remaining?: number;
          s3_time_remaining?: number;
          s1_raw_score?: number;
          s2_raw_score?: number;
          s3_raw_score?: number;
          s1_scaled_score?: number | null;
          s2_scaled_score?: number | null;
          s3_scaled_score?: number | null;
          total_scaled_score?: number | null;
          completed_at?: string | null;
          total_duration_seconds?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "test_sessions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };

      user_answers: {
        Row: {
          id: string;
          session_id: string;
          user_id: string;
          question_id: string;
          selected_answer: "A" | "B" | "C" | "D" | null;
          is_correct: boolean | null;
          time_spent_seconds: number | null;
          answered_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          user_id: string;
          question_id: string;
          selected_answer?: "A" | "B" | "C" | "D" | null;
          is_correct?: boolean | null;
          time_spent_seconds?: number | null;
          answered_at?: string;
        };
        Update: {
          selected_answer?: "A" | "B" | "C" | "D" | null;
          is_correct?: boolean | null;
          time_spent_seconds?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_answers_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "test_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_answers_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_answers_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
            referencedRelation: "questions";
            referencedColumns: ["id"];
          },
        ];
      };

      user_progress: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          questions_attempted: number;
          questions_correct: number;
          study_minutes: number;
          s1_attempted: number;
          s1_correct: number;
          s2_attempted: number;
          s2_correct: number;
          s3_attempted: number;
          s3_correct: number;
          listening_part_a_score: number | null;
          listening_part_b_score: number | null;
          listening_part_c_score: number | null;
          structure_score: number | null;
          written_expression_score: number | null;
          reading_vocabulary_score: number | null;
          reading_inference_score: number | null;
          reading_main_idea_score: number | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          date?: string;
          questions_attempted?: number;
          questions_correct?: number;
          study_minutes?: number;
          s1_attempted?: number;
          s1_correct?: number;
          s2_attempted?: number;
          s2_correct?: number;
          s3_attempted?: number;
          s3_correct?: number;
          listening_part_a_score?: number | null;
          listening_part_b_score?: number | null;
          listening_part_c_score?: number | null;
          structure_score?: number | null;
          written_expression_score?: number | null;
          reading_vocabulary_score?: number | null;
          reading_inference_score?: number | null;
          reading_main_idea_score?: number | null;
        };
        Update: {
          questions_attempted?: number;
          questions_correct?: number;
          study_minutes?: number;
          s1_attempted?: number;
          s1_correct?: number;
          s2_attempted?: number;
          s2_correct?: number;
          s3_attempted?: number;
          s3_correct?: number;
          listening_part_a_score?: number | null;
          listening_part_b_score?: number | null;
          listening_part_c_score?: number | null;
          structure_score?: number | null;
          written_expression_score?: number | null;
          reading_vocabulary_score?: number | null;
          reading_inference_score?: number | null;
          reading_main_idea_score?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_progress_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };

      study_streaks: {
        Row: {
          id: string;
          user_id: string;
          current_streak: number;
          longest_streak: number;
          last_study_date: string | null;
          streak_start_date: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          current_streak?: number;
          longest_streak?: number;
          last_study_date?: string | null;
          streak_start_date?: string | null;
        };
        Update: {
          current_streak?: number;
          longest_streak?: number;
          last_study_date?: string | null;
          streak_start_date?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "study_streaks_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };

      ai_conversations: {
        Row: {
          id: string;
          user_id: string;
          question_id: string | null;
          session_id: string | null;
          messages: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          question_id?: string | null;
          session_id?: string | null;
          messages?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          question_id?: string | null;
          session_id?: string | null;
          messages?: Json;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ai_conversations_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };

      bookmarks: {
        Row: {
          id: string;
          user_id: string;
          question_id: string;
          note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          question_id: string;
          note?: string | null;
          created_at?: string;
        };
        Update: {
          note?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "bookmarks_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bookmarks_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
            referencedRelation: "questions";
            referencedColumns: ["id"];
          },
        ];
      };

      leaderboard_weekly: {
        Row: {
          id: string;
          user_id: string;
          week_start: string;
          total_questions: number;
          accuracy_percent: number;
          mock_tests_completed: number;
          best_mock_score: number;
          study_minutes: number;
          xp_points: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          week_start: string;
          total_questions?: number;
          accuracy_percent?: number;
          mock_tests_completed?: number;
          best_mock_score?: number;
          study_minutes?: number;
          xp_points?: number;
        };
        Update: {
          total_questions?: number;
          accuracy_percent?: number;
          mock_tests_completed?: number;
          best_mock_score?: number;
          study_minutes?: number;
          xp_points?: number;
        };
        Relationships: [
          {
            foreignKeyName: "leaderboard_weekly_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };

      vocabulary: {
        Row: {
          id: string;
          word: string;
          definition: string;
          example_sentence: string | null;
          part_of_speech: string | null;
          difficulty: number | null;
          category: "academic" | "science" | "social_science" | "arts" | "business" | "general" | null;
          synonyms: string[] | null;
          collocations: string[] | null;
        };
        Insert: {
          id?: string;
          word: string;
          definition: string;
          example_sentence?: string | null;
          part_of_speech?: string | null;
          difficulty?: number | null;
          category?: "academic" | "science" | "social_science" | "arts" | "business" | "general" | null;
          synonyms?: string[] | null;
          collocations?: string[] | null;
        };
        Update: {
          word?: string;
          definition?: string;
          example_sentence?: string | null;
          part_of_speech?: string | null;
          difficulty?: number | null;
          category?: "academic" | "science" | "social_science" | "arts" | "business" | "general" | null;
          synonyms?: string[] | null;
          collocations?: string[] | null;
        };
        Relationships: [];
      };

      user_vocabulary: {
        Row: {
          id: string;
          user_id: string;
          vocab_id: string;
          status: "new" | "learning" | "mastered";
          review_count: number;
          next_review_date: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          vocab_id: string;
          status?: "new" | "learning" | "mastered";
          review_count?: number;
          next_review_date?: string | null;
        };
        Update: {
          status?: "new" | "learning" | "mastered";
          review_count?: number;
          next_review_date?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_vocabulary_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_vocabulary_vocab_id_fkey";
            columns: ["vocab_id"];
            isOneToOne: false;
            referencedRelation: "vocabulary";
            referencedColumns: ["id"];
          },
        ];
      };
    };

    Views: {
      [_ in never]: never;
    };

    Functions: {
      calculate_scaled_score: {
        Args: {
          section_num: number;
          raw_score: number;
          total_questions: number;
        };
        Returns: number;
      };
      update_study_streak: {
        Args: { p_user_id: string };
        Returns: undefined;
      };
    };

    Enums: {
      [_ in never]: never;
    };

    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// -------------------------------------------------------
// Convenience Row types
// -------------------------------------------------------
export type Profile          = Database["public"]["Tables"]["profiles"]["Row"];
export type Question         = Database["public"]["Tables"]["questions"]["Row"];
export type Passage          = Database["public"]["Tables"]["passages"]["Row"];
export type AudioConversation = Database["public"]["Tables"]["audio_conversations"]["Row"];
export type TestSession      = Database["public"]["Tables"]["test_sessions"]["Row"];
export type UserAnswer       = Database["public"]["Tables"]["user_answers"]["Row"];
export type UserProgress     = Database["public"]["Tables"]["user_progress"]["Row"];
export type StudyStreak      = Database["public"]["Tables"]["study_streaks"]["Row"];
export type AiConversation   = Database["public"]["Tables"]["ai_conversations"]["Row"];
export type Bookmark         = Database["public"]["Tables"]["bookmarks"]["Row"];
export type LeaderboardEntry = Database["public"]["Tables"]["leaderboard_weekly"]["Row"];
export type Vocabulary       = Database["public"]["Tables"]["vocabulary"]["Row"];
export type UserVocabulary   = Database["public"]["Tables"]["user_vocabulary"]["Row"];
