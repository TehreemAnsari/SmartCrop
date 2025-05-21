import argparse
from app import app  # noqa: F401

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=5000, help='Port to run the Flask app on')
    args = parser.parse_args()

    app.run(host="0.0.0.0", port=args.port, debug=True)

