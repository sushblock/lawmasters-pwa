import { useCallback, useEffect, useState } from "react";
import { X, FileText } from "lucide-react";
import { Modal, Button } from "../../components/common";
import { MATTER_TYPES } from "../../data";

// Paste your AIAssistantWidget here (unchanged, but import Button/FileText/X from above)
// ===== AI-POWERED NEW MATTER FORM =====
const AIAssistantWidget = ({
  isProcessing,
  suggestion,
  onAccept,
  onReject,
  acceptLabel = '✓ Accept',
}) => {
  if (!suggestion && !isProcessing) return null;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 mb-4">
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-purple-100 rounded-full">
          {isProcessing ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
          ) : (
            <FileText className="h-4 w-4 text-purple-600" />
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-purple-900 mb-2">
            {isProcessing ? "AI Assistant is analyzing..." : "🤖 AI Suggestion"}
          </h4>
          {suggestion && (
            <>
              <p className="text-sm text-purple-800 mb-3">{suggestion}</p>
              <div className="flex space-x-2">
                <Button size="sm" variant="primary" onClick={onAccept}>
                  {acceptLabel}
                </Button>
                <Button size="sm" variant="secondary" onClick={onReject}>
                  ✗ Dismiss
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default function NewMatterForm({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    matterType: "",
    title: "",
    client: "",
    opponent: "",
    court: "",
    description: "",
    urgency: "medium",
    expectedDuration: "",
  });

  const [aiAction, setAiAction] = useState(null);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiDraftTitle, setAiDraftTitle] = useState("");
  const [enhancedDescription, setEnhancedDescription] = useState("");
  const [isEnhancingDescription, setIsEnhancingDescription] = useState(false);
  const [showDescriptionPreview, setShowDescriptionPreview] = useState(false);

  // AI Title Generation with real logic
  const generateAITitle = useCallback(() => {
    if (formData.client && formData.opponent && formData.matterType) {
      setIsAiProcessing(true);

      setTimeout(() => {
        const matterTypeObj = MATTER_TYPES.find(
          (t) => t.id === formData.matterType
        );
        let generatedTitle = "";

        // Intelligent title generation based on matter type
        switch (formData.matterType) {
          case "writ":
            generatedTitle = `${formData.client} vs. ${formData.opponent} (W.P.)`;
            break;
          case "criminal":
            generatedTitle = `State vs. ${formData.opponent} (Crl. Case)`;
            break;
          case "commercial":
            generatedTitle = `${formData.client} vs. ${formData.opponent} (CS(OS))`;
            break;
          case "corporate":
            generatedTitle = `${formData.client} vs. ${formData.opponent} (Company Petition)`;
            break;
          default:
            generatedTitle = `${formData.client} vs. ${formData.opponent}`;
        }

        setAiDraftTitle(generatedTitle);
        setAiAction({ type: "setTitle", value: generatedTitle });
        setAiSuggestion(
          `✨ AI-generated title based on ${matterTypeObj?.name} conventions: "${generatedTitle}". This follows standard court nomenclature and will be automatically formatted for filing.`
        );
        setIsAiProcessing(false);
      }, 1500);
    }
  }, [formData.client, formData.opponent, formData.matterType]);

  // AI Description Enhancement with legal terminology
  const enhanceDescription = useCallback(() => {
    if (formData.description.trim()) {
      setIsEnhancingDescription(true);

      setTimeout(() => {
        // Simulate GenAI enhancement
        const enhanced = `MATTER SYNOPSIS:\n\n${formData.description}\n\nLEGAL ISSUES:\n• Jurisdiction and maintainability\n• Applicable statutory provisions\n• Precedent analysis required\n\nPROPOSED STRATEGY:\n• Initial pleadings preparation\n• Evidence collection framework\n• Timeline for preliminary hearings\n\nRECOMMENDED ACTIONS:\n1. File vakalatnama within 7 days\n2. Prepare and file counter-affidavit\n3. Compile relevant case law citations\n\nNOTE: This is an AI-enhanced draft. Please review and modify as per specific case requirements.`;

        setEnhancedDescription(enhanced);
        setShowDescriptionPreview(true);
        setIsEnhancingDescription(false);
        setAiSuggestion(
          "✨ AI has enhanced your description with legal structure, identified issues, and suggested action items. Review the enhanced version below."
        );
      }, 2500);
    }
  }, [formData.description]);

  // Auto-suggest court based on matter type with intelligent logic
  useEffect(() => {
    if (formData.matterType && !formData.court) {
      const matterType = MATTER_TYPES.find((t) => t.id === formData.matterType);
      if (matterType && matterType.courts.length > 0) {
        setFormData((prev) => ({ ...prev, court: matterType.courts[0] }));
        setAiSuggestion(
          `🎯 AI recommends "${matterType.courts[0]}" as the appropriate forum for ${matterType.name}. Other available options are shown in the dropdown.`
        );
      }
    }
  }, [formData.matterType, formData.court]);

  // Smart urgency detection based on keywords
  useEffect(() => {
    if (formData.description) {
      const urgentKeywords = [
        "urgent",
        "immediate",
        "bail",
        "injunction",
        "stay",
        "arrest",
        "detention",
      ];
      const desc = formData.description.toLowerCase();
      const hasUrgentKeyword = urgentKeywords.some((keyword) =>
        desc.includes(keyword)
      );

      if (hasUrgentKeyword && formData.urgency !== "urgent") {
        setAiSuggestion(
          '⚠️ AI detected urgent keywords in your description. Consider marking this matter as "Urgent" priority.'
        );
        setAiAction({ type: "setUrgency", value: "urgent" });
      }
    }
  }, [formData.description, formData.urgency]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAIAccept = () => {
    if (aiAction?.type === "setTitle" && aiAction.value) {
      setFormData((prev) => ({ ...prev, title: aiAction.value }));
      setAiSuggestion("✓ AI title applied.");
    } else if (aiAction?.type === "setUrgency" && aiAction.value) {
      setFormData((prev) => ({ ...prev, urgency: aiAction.value }));
      setAiSuggestion("✓ Urgency updated to Urgent.");
    }
    setAiDraftTitle("");
    setAiAction(null);
    // optionally auto-clear the banner after a moment
    setTimeout(() => setAiSuggestion(""), 1200);
  };

  const handleAIReject = () => {
    setAiSuggestion("");
    setAiDraftTitle("");
    setAiAction(null);
  };

  const selectedMatterType = MATTER_TYPES.find(
    (t) => t.id === formData.matterType
  );

  return (
    <Modal isOpen={true} onClose={onClose} title="Create New Matter">
      <div className="space-y-6">
        {/* AI Assistant Widget */}
        <AIAssistantWidget
          isProcessing={isAiProcessing}
          suggestion={aiSuggestion}
          onAccept={handleAIAccept}
          onReject={handleAIReject}
          acceptLabel={aiAction?.type === 'setUrgency' ? '✓ Mark as Urgent' : '✓ Accept'}
        />

        {/* Matter Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Matter Type *
          </label>
          <select
            value={formData.matterType}
            onChange={(e) => handleInputChange("matterType", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Matter Type</option>
            {MATTER_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Client and Opponent */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client Name *
            </label>
            <input
              type="text"
              value={formData.client}
              onChange={(e) => handleInputChange("client", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter client name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opponent/Respondent
            </label>
            <input
              type="text"
              value={formData.opponent}
              onChange={(e) => handleInputChange("opponent", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter opponent name"
            />
          </div>
        </div>

        {/* AI-Powered Title Generation */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Matter Title *
            </label>
            <Button
              size="sm"
              variant="secondary"
              onClick={generateAITitle}
              disabled={
                !formData.client ||
                !formData.opponent ||
                !formData.matterType ||
                isAiProcessing
              }
              className="text-xs"
            >
              🤖 Generate with AI
            </Button>
          </div>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter matter title or generate with AI"
            required
          />
        </div>

        {/* Court Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Court/Forum *
          </label>
          <select
            value={formData.court}
            onChange={(e) => handleInputChange("court", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Court</option>
            {selectedMatterType?.courts.map((court) => (
              <option key={court} value={court}>
                {court}
              </option>
            ))}
          </select>
          {selectedMatterType && (
            <p className="text-xs text-gray-500 mt-1">
              Recommended courts for {selectedMatterType.name}
            </p>
          )}
        </div>

        {/* Description with AI Enhancement */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Matter Description
            </label>
            <Button
              size="sm"
              variant="secondary"
              onClick={enhanceDescription}
              disabled={!formData.description.trim() || isEnhancingDescription}
              className="text-xs"
            >
              {isEnhancingDescription
                ? "🔄 Enhancing..."
                : "🤖 Enhance with AI"}
            </Button>
          </div>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe the matter details. AI will help structure and enhance this..."
          />
          <p className="text-xs text-gray-500 mt-1">
            💡 AI can analyze, structure, and add legal terminology to your
            description
          </p>

          {/* Enhanced Description Preview */}
          {showDescriptionPreview && enhancedDescription && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-blue-900">
                  AI-Enhanced Description Preview
                </h4>
                <button
                  onClick={() => setShowDescriptionPreview(false)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <pre className="text-xs text-blue-800 whitespace-pre-wrap font-sans">
                {enhancedDescription}
              </pre>
              <div className="flex space-x-2 mt-3">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    handleInputChange("description", enhancedDescription);
                    setShowDescriptionPreview(false);
                    setAiSuggestion(
                      "✓ AI-enhanced description applied successfully!"
                    );
                  }}
                >
                  ✓ Use Enhanced Version
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setShowDescriptionPreview(false)}
                >
                  Keep Original
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Priority and Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Urgency Level
            </label>
            <select
              value={formData.urgency}
              onChange={(e) => handleInputChange("urgency", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Duration
            </label>
            <select
              value={formData.expectedDuration}
              onChange={(e) =>
                handleInputChange("expectedDuration", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Duration</option>
              <option value="1-3 months">1-3 months</option>
              <option value="3-6 months">3-6 months</option>
              <option value="6-12 months">6-12 months</option>
              <option value="1+ years">1+ years</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              // Here we would normally save the matter
              alert("Matter would be saved with AI-enhanced data");
              onClose();
            }}
          >
            Create Matter
          </Button>
        </div>
      </div>
    </Modal>
  );
}
