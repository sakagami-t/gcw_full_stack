from fastapi import FastAPI

app = FastAPI() # FastAPIはStarletteを直接継承するクラスです。


@app.get("/")  # デコレーション、パス= /, オペレーション = get
async def root():
    return {"message": "Hello World"} # コンテンツの生成
