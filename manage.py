import subprocess


def run_dev():
    subprocess.run(["uvicorn", "src.main:app", "--reload"]) 


if __name__ == "__main__":
    run_dev()
