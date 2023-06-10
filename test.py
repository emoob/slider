import cv2, base64, requests, execjs, copy
import numpy as np


class Request(object):
    def __init__(self) -> None:
        with open("test.js", "r") as f:
            js_code = f.read()
        self.ctx = execjs.compile(js_code)
        self.bs64_img = "https://lcgwypt-login.yiboshi.com/captcha/get"
        self.check = "https://lcgwypt-login.yiboshi.com/captcha/v2/check"
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.68",
            "Content-Type": "application/json",
        }
        self.payload = {"captchaType": "blockPuzzle"}

    def sending(self, url: str, headers: dict, data: dict) -> dict:
        rqs = requests.post(url=url, headers=headers, json=data)
        if rqs.status_code == 200:
            return rqs.json()
        return {}

    def call(self, str: str) -> str:
        return self.ctx.call("back", str)


class SlideCrack(object):
    def __init__(self, gap_base64: str, bg_base64: str) -> None:
        self.gap_base64 = gap_base64
        self.bg_base64 = bg_base64

    def template_match(self, tpl: cv2.Mat, target: cv2.Mat):
        result = cv2.matchTemplate(target, tpl, cv2.TM_CCOEFF_NORMED)
        _, _, _, max_loc = cv2.minMaxLoc(result)
        tl = max_loc
        return tl[0]

    @staticmethod
    def image_edge_detection(img: cv2.Mat):
        edges = cv2.Canny(img, 200, 550)
        return edges

    def discern(self) -> int:
        gap_data = base64.b64decode(self.gap_base64)
        bg_data = base64.b64decode(self.bg_base64)
        gap_img = cv2.imdecode(np.frombuffer(gap_data, np.uint8), cv2.IMREAD_COLOR)
        bg_img = cv2.imdecode(np.frombuffer(bg_data, np.uint8), cv2.IMREAD_COLOR)
        slide = self.image_edge_detection(gap_img)
        slide_resized = cv2.resize(slide, dsize=(45, 155))
        bg_gray = cv2.cvtColor(bg_img, cv2.COLOR_BGR2GRAY)
        bg_resized = cv2.resize(bg_gray, dsize=(340, 155))
        bg_edges = self.image_edge_detection(bg_resized)
        slide_pic = cv2.cvtColor(slide_resized, cv2.COLOR_GRAY2RGB)
        bg_pic = cv2.cvtColor(bg_edges, cv2.COLOR_GRAY2RGB)
        x = self.template_match(slide_pic, bg_pic)
        return x


def run() -> dict | None:
    req = Request()
    data = req.sending(req.bs64_img, req.headers, req.payload)
    if "repData" not in data:
        return
    gap_base64, bg_base64, token = (
        data["repData"]["originalImageBase64"],
        data["repData"]["jigsawImageBase64"],
        data["repData"]["token"],
    )
    position = SlideCrack(bg_base64, gap_base64).discern()
    sm2 = req.call(str(310 * position / 340))
    payload_copy = copy.copy(req.payload)
    payload_copy["pointJson"] = sm2
    payload_copy["token"] = token
    return req.sending(req.check, req.headers, payload_copy)


if __name__ == "__main__":
    print(run())
