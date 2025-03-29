// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";

// interface FormData {
//   name: string;
//   description: string;
//   location: string;
//   industry: string;
//   preferences: string;
//   keyword: string;
//   website_link: string;
// }

// interface Lead {
//   title: string;
//   text: string;
//   comment: string;
//   url: string;
//   user: string;
//   sentiment: string;
//   posted: string;
// }

// interface LeadsData {
//   reddit_leads: Lead[];
//   twitter_leads: Lead[];
//   linkedin_leads: Lead[];
// }

// export default function NewProjectForm() {
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     description: "",
//     location: "",
//     industry: "",
//     preferences: "",
//     keyword: "",
//     website_link: "",
//   });

//   const [leads, setLeads] = useState<LeadsData>({
//     reddit_leads: [],
//     twitter_leads: [],
//     linkedin_leads: [],
//   });

//   const [error, setError] = useState<string | null>(null);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://127.0.0.1:5000/generate_leads", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error("Error submitting form");
//       }

//       const result = await response.json();
//       setLeads(result);
//     } catch (error) {
//       if (error instanceof Error) {
//         setError("Error: " + error.message);
//       } else {
//         setError("An unknown error occurred");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w mx-auto bg-white rounded-lg shadow p-6">
//         <h1 className="text-2xl font-bold mb-6">New project</h1>
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {/* Form fields */}
//           <div className="space-y-2">
//             <Label htmlFor="name">Business Name</Label>
//             <Input
//               id="name"
//               placeholder="E.g, EzForms"
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="description">Business Description</Label>
//             <Textarea
//               id="description"
//               placeholder="E.g, The easiest way to create forms."
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="website_link">Website Link</Label>
//             <Input
//               id="website_link"
//               placeholder="E.g, https://www.example.com"
//               value={formData.website_link}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="location">Location</Label>
//             <Input
//               id="location"
//               placeholder="E.g, United States"
//               value={formData.location}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="industry">Industry</Label>
//             <Input
//               id="industry"
//               placeholder="E.g, Technology"
//               value={formData.industry}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="preferences">Target Audience Preferences</Label>
//             <Textarea
//               id="preferences"
//               placeholder="E.g, Leads looking for marketing solutions."
//               value={formData.preferences}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="keyword">Keyword for Lead Generation</Label>
//             <Input
//               id="keyword"
//               placeholder="E.g, Marketing automation"
//               value={formData.keyword}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex space-x-4 pt-4">
//             <Button type="submit">Generate Leads</Button>
//             <Button variant="outline">Back to projects</Button>
//           </div>
//         </form>

//         {error && <p className="text-red-500 mt-4">{error}</p>}
//         {leads.reddit_leads.length > 0 && (
//           <div className="mt-6">
//             <h2 className="text-xl font-bold">Reddit Leads</h2>
//             <ul className="list-disc pl-6">
//               {leads.reddit_leads.map((lead, index) => (
//                 <li key={index} className="mt-2">
//                   <p>
//                     <strong>Title:</strong> {lead.title}
//                   </p>
//                   <p>
//                     <strong>Sentiment:</strong> {lead.sentiment}
//                   </p>
//                   <p>
//                     <strong>Generated Comment:</strong> {lead.comment}
//                   </p>
//                   <p>
//                     <strong>URL:</strong>{" "}
//                     <a
//                       href={lead.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       {lead.url}
//                     </a>
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         {leads.twitter_leads.length > 0 && (
//           <div className="mt-6">
//             <h2 className="text-xl font-bold">Twitter Leads</h2>
//             <ul className="list-disc pl-6">
//               {leads.twitter_leads.map((lead, index) => (
//                 <li key={index} className="mt-2">
//                   <p>
//                     <strong>Tweet:</strong> {lead.text}
//                   </p>
//                   <p>
//                     <strong>User:</strong> {lead.user}
//                   </p>
//                   <p>
//                     <strong>Sentiment:</strong> {lead.sentiment}
//                   </p>
//                   <p>
//                     <strong>Generated Comment:</strong> {lead.comment}
//                   </p>
//                   <p>
//                     <strong>Posted:</strong> {lead.posted}
//                   </p>
//                   <p>
//                     <strong>URL:</strong>{" "}
//                     <a
//                       href={lead.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       {lead.url}
//                     </a>
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         {leads.linkedin_leads.length > 0 && (
//           <div className="mt-6">
//             <h2 className="text-xl font-bold">LinkedIn Leads</h2>
//             <ul className="list-disc pl-6">
//               {leads.linkedin_leads.map((lead, index) => (
//                 <li key={index} className="mt-2">
//                   <p>
//                     <strong>Title:</strong> {lead.text}
//                   </p>
//                   <p>
//                     <strong>User:</strong> {lead.user}
//                   </p>
//                   <p>
//                     <strong>Sentiment:</strong> {lead.sentiment}
//                   </p>
//                   <p>
//                     <strong>Generated Comment:</strong> {lead.comment}
//                   </p>
//                   <p>
//                     <strong>Posted:</strong> {lead.posted}
//                   </p>
//                   <p>
//                     <strong>URL:</strong>{" "}
//                     <a
//                       href={lead.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       {lead.url}
//                     </a>
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormData {
  name: string;
  description: string;
  location: string;
  industry: string;
  preferences: string;
  keyword: string;
  website_link: string;
}

interface Lead {
  title: string;
  text: string;
  comment: string;
  url: string;
  user: string;
  sentiment: string;
  posted: string;
}

interface LeadsData {
  reddit_leads: Lead[];
  twitter_leads: Lead[];
  linkedin_leads: Lead[];
}

export default function NewProjectForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    location: "",
    industry: "",
    preferences: "",
    keyword: "",
    website_link: "",
  });

  const [leads, setLeads] = useState<LeadsData>({
    reddit_leads: [],
    twitter_leads: [],
    linkedin_leads: [],
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Mock response for testing
      const mockResponse = {
        reddit_leads: [
          {
            title: "Reddit Post",
            text: "Looking for form solutions",
            comment: "Check out EzForms!",
            url: "https://reddit.com/r/test/post",
            user: "reddit_user",
            sentiment: "positive",
            posted: "2023-10-01",
          },
        ],
        twitter_leads: [
          {
            title: "",
            text: "Need a form builder for my startup",
            comment: "EzForms might be what you need!",
            url: "https://twitter.com/user/status/123",
            user: "twitter_user",
            sentiment: "neutral",
            posted: "2023-10-02",
          },
        ],
        linkedin_leads: [],
      };
      setLeads(mockResponse);

      // Uncomment this to use the real API once the backend is ready
      /*
      const response = await fetch("http://127.0.0.1:5000/generate_leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error submitting form");
      }

      const result = await response.json();
      setLeads(result);
      */
    } catch (error) {
      if (error instanceof Error) {
        setError("Error: " + error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">New project</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="space-y-2">
            <Label htmlFor="name">Business Name</Label>
            <Input
              id="name"
              placeholder="E.g, EzForms"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Business Description</Label>
            <Textarea
              id="description"
              placeholder="E.g, The easiest way to create forms."
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website_link">Website Link</Label>
            <Input
              id="website_link"
              placeholder="E.g, https://www.example.com"
              value={formData.website_link}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="E.g, United States"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              placeholder="E.g, Technology"
              value={formData.industry}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="preferences">Target Audience Preferences</Label>
            <Textarea
              id="preferences"
              placeholder="E.g, Leads looking for marketing solutions."
              value={formData.preferences}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="keyword">Keyword for Lead Generation</Label>
            <Input
              id="keyword"
              placeholder="E.g, Marketing automation"
              value={formData.keyword}
              onChange={handleChange}
            />
          </div>
          <div className="flex space-x-4 pt-4">
            <Button type="submit">Generate Leads</Button>
            <Button variant="outline">Back to projects</Button>
          </div>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {leads.reddit_leads.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold">Reddit Leads</h2>
            <ul className="list-disc pl-6">
              {leads.reddit_leads.map((lead, index) => (
                <li key={index} className="mt-2">
                  <p>
                    <strong>Title:</strong> {lead.title}
                  </p>
                  <p>
                    <strong>Sentiment:</strong> {lead.sentiment}
                  </p>
                  <p>
                    <strong>Generated Comment:</strong> {lead.comment}
                  </p>
                  <p>
                    <strong>URL:</strong>{" "}
                    <a
                      href={lead.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {lead.url}
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {leads.twitter_leads.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold">Twitter Leads</h2>
            <ul className="list-disc pl-6">
              {leads.twitter_leads.map((lead, index) => (
                <li key={index} className="mt-2">
                  <p>
                    <strong>Tweet:</strong> {lead.text}
                  </p>
                  <p>
                    <strong>User:</strong> {lead.user}
                  </p>
                  <p>
                    <strong>Sentiment:</strong> {lead.sentiment}
                  </p>
                  <p>
                    <strong>Generated Comment:</strong> {lead.comment}
                  </p>
                  <p>
                    <strong>Posted:</strong> {lead.posted}
                  </p>
                  <p>
                    <strong>URL:</strong>{" "}
                    <a
                      href={lead.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {lead.url}
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {leads.linkedin_leads.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold">LinkedIn Leads</h2>
            <ul className="list-disc pl-6">
              {leads.linkedin_leads.map((lead, index) => (
                <li key={index} className="mt-2">
                  <p>
                    <strong>Title:</strong> {lead.text}
                  </p>
                  <p>
                    <strong>User:</strong> {lead.user}
                  </p>
                  <p>
                    <strong>Sentiment:</strong> {lead.sentiment}
                  </p>
                  <p>
                    <strong>Generated Comment:</strong> {lead.comment}
                  </p>
                  <p>
                    <strong>Posted:</strong> {lead.posted}
                  </p>
                  <p>
                    <strong>URL:</strong>{" "}
                    <a
                      href={lead.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {lead.url}
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}