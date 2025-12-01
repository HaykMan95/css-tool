import { Form, useActionData, useNavigation } from "react-router";
import { AdsArea } from "./components/AdsArea";
import { TextArea } from "./components/TextArea";
import { ResultBox } from "./components/ResultBox";
import { cssToTailwind } from "./helpers";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const cssInput = formData.get("css") as string;

  if (!cssInput || cssInput.trim().length === 0) {
    return { error: "CSS input is empty", results: null };
  }

  // TODO: Replace this with real converter logic
  // Example: send to your backend microservice
  try {
    // fake processing
    const results = cssToTailwind(cssInput);

    return { results, error: null };
  } catch (err) {
    return { error: "Conversion failed", results: null };
  }
}

export default function IndexPage() {
  const actionData = useActionData() as
    | { results: Record<string, string>; error: string | null }
    | undefined;

  const navigation = useNavigation();
  const loading = navigation.state === "submitting";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AdsArea slotId="2292052614" />

        <main className="flex-1 max-w-4xl mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              CSS → Tailwind Converter
            </h1>
            <p className="text-gray-600">
              Convert your CSS styles to Tailwind CSS utility classes instantly
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <Form method="post">
              <TextArea
                name="css"
                maxLines={50}
              />

              <div className="mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Converting..." : "Convert to Tailwind"}
                </button>
              </div>
            </Form>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <ResultBox
              results={actionData?.results || undefined}
              error={actionData?.error || null}
              loading={loading}
            />
          </div>
        </main>

        <AdsArea slotId="4726644266" />
      </div>
    </div>
  );
}
