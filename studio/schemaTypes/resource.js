export default {
  name: "resource",
  title: "Resource",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Titel" },
    { name: "description", type: "text", title: "Beskrivelse" },
    { name: "category", type: "string", title: "Kategori" },
    { name: "tags", type: "array", title: "Tags", of: [{ type: "string" }] },
    { name: "updated", type: "string", title: "Opdateret" },
    { name: "link", type: "url", title: "Download-link" },
    {
      name: "icon",
      title: "Ikon",
      type: "string",
      options: {
        list: [
          { title: "FileText", value: "FileText" },
          { title: "Zap", value: "Zap" },
          { title: "PenTool", value: "PenTool" },
          { title: "Globe", value: "Globe" },
          { title: "BookOpen", value: "BookOpen" },
          { title: "BarChart2", value: "BarChart2" },
        ],
      },
    },
  ],
  preview: {
  select: {
    title: "title",
    media: "icon",
    subtitle: "link",
  },
},

};
