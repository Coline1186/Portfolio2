import privacyContent from "@/layoutElements/privacy.md?raw";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

function Privacy() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Politique de confidentialité</h1>
      <p className="mb-4">Dernière mise à jour : le 3 mars 2026</p>
      <div className="prose prose-neutral max-w-none">
        <ReactMarkdown remarkPlugins={[remarkBreaks]}>
          {privacyContent}
        </ReactMarkdown>
      </div>
    </main>
  );
}

export default Privacy;
