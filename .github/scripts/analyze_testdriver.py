import os
import sys
import json
import urllib.request
import urllib.error

SYSTEM_PROMPT = """You are an elite Lead UI/UX Quality Assurance Engineer. Analyze the provided TestDriver UI test results. Focus strictly on visual bugs, alignment issues, layout overflow, or broken user flows. Output a concise, high-signal developer brief telling our coding agent (@jules) exactly what needs to be fixed."""

def main():
    api_key = os.environ.get("GEMINI_API_KEY")
    testdriver_payload = os.environ.get("TESTDRIVER_PAYLOAD", "").strip()

    if not api_key:
        print("Error: GEMINI_API_KEY environment variable is missing.", file=sys.stderr)
        sys.exit(1)

    if not testdriver_payload:
        print("Warning: TESTDRIVER_PAYLOAD is empty. Generating default acknowledgment.", file=sys.stderr)
        testdriver_payload = "No specific payload content provided."

    prompt = f"{SYSTEM_PROMPT}\n\nHere is the TestDriver AI output/log:\n```\n{testdriver_payload}\n```"

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    headers = {"Content-Type": "application/json"}
    body = {
        "contents": [{
            "parts": [{"text": prompt}]
        }]
    }

    try:
        req = urllib.request.Request(url, data=json.dumps(body).encode("utf-8"), headers=headers, method="POST")
        with urllib.request.urlopen(req) as response:
            res_data = json.loads(response.read().decode("utf-8"))

            try:
                analysis = res_data["candidates"][0]["content"]["parts"][0]["text"]
            except (KeyError, IndexError) as e:
                analysis = f"Unable to parse response from Gemini API: {e}\nRaw response: {json.dumps(res_data)}"

            brief = f"### 🧠 Gemini QA Brain Analysis for @jules\n\n{analysis}\n\n---\n*Automated QA briefing generated via TestDriver AI + Gemini 1.5 Flash*"
            print(brief)

    except urllib.error.HTTPError as e:
        error_content = e.read().decode("utf-8")
        print(f"HTTPError querying Gemini API ({e.code}): {error_content}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error querying Gemini API: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
