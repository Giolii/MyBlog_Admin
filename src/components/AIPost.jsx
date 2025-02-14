import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import MyEditor from "./Reusable/MyEditor";
import sendNewPost from "../utils/Posts/sendNewPost";
import { useNavigate } from "react-router-dom";

const AIPost = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmitNewPost = () => {
    try {
      sendNewPost({ title: title, content: generatedContent });
      navigate("/");
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const handleEditorCange = (newContent) => {
    setGeneratedContent(newContent);
  };

  const generateBlogPost = async () => {
    if (!prompt || !title) {
      setError("Please provide both a title and a prompt");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
          import.meta.env.VITE_GEMINI_API
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Write a blog post with the title "${title}". 
                       Use this additional context: ${prompt}.
                       Use html elements with inline styles.
                       Minimum 300 words.`,
                  },
                ],
              },
            ],
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to generate content");
      }
      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      setGeneratedContent(generatedText);
    } catch (error) {
      setError("Error generating blog post. Please try again.");
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">AI Blog Post Generator</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Blog Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog post title"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Writing Prompt / Context
            </label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want the blog post to be about..."
              className="w-full h-32"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            onClick={generateBlogPost}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Blog Post"
            )}
          </Button>
          {generatedContent && (
            <div className="mt-6 space-y-4">
              <MyEditor value={generatedContent} onChange={handleEditorCange} />
              <Button className="w-full" onClick={handleSubmitNewPost}>
                Submit new Post
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default AIPost;
