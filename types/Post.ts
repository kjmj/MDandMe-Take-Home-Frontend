import { CommentsMapType } from "@/types/CommentsMapType";

export type Post = {
    post_url: string;
    title: string;
    created_at: string;
    num_hugs: number;
    patient_description: string;
    assessment: string;
    question: string;
    comments: CommentsMapType;
}