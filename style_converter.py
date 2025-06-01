from collections import defaultdict
from enum import Enum
from pathlib import Path
from typing import Any

class PyCSS(object):

    @classmethod
    def parse(cls, startnode, parents = None):
        result = []
        nodes_to_parse = [([], startnode)]

        while nodes_to_parse:
            parents, node = nodes_to_parse.pop(0)
            if parents:
                result.append("%s { " % " ".join(parents))
            else:
                parents = []

            for key, value in node.items():
                if value.__class__.__name__ in ('str', 'unicode'):
                    result.append(f"{key}: {value};")
                elif value.__class__.__name__ == 'function':
                   result.append(f"{key}: {value}();")
                elif value.__class__.__name__ == 'dict':
                    nodes_to_parse.append(([p for p in parents ] + [key], value))
            if result:
                result.append("}\n")

        return "".join(result)

class Dimension(Enum):
    WIDTH = "WIDTH"
    HEIGHT = "HEIGHT"

class ScreenType(Enum):
    CONTESTANT = 1
    HOST = 2
    TVSCREEN = 3

def write_css(style: str, screen_type: ScreenType, content: str):
    with open(Path("styles") / f"location_{style.replace('-', '_')}_{screen_type.value}.css", "w") as file:
        file.write(content)


font_mapping = {
    "Open Sans": "'Open Sans'",
    "Verdana": "Verdana, sans-serif",
    "ITC Conduit Cyrillic": "sans-serif",
}

class Converter:
    def __init__(self, width: int, height: int):
        self._width = width
        self._height = height

    def get_calc(self, value: Any, direction: Dimension) -> str:
        return f"calc({value} * 100{'vh' if direction == Dimension.HEIGHT else 'vw'} / {self._width if direction == Dimension.WIDTH else self._height})"

def convert(style: str, screen_type: ScreenType):
    with open(Path("graphics") / style / "RESOLUTION" / f"1920x1080{screen_type.value}.resolution", "r") as file:
        data = file.readlines()

    content: str = ""
    result = defaultdict(dict)
    # {
    #     f"#question-area.{style}": {},
    #     f"#money-tree-area.{style}": {},
    #     f"#money-tree-overlay.{style}": {},
    # }

    d_data = {}
    for line in data:
        try:
            command, vals = line.strip().split("|")[0], line.strip().split("|")[1:]
        except ValueError:
            continue
        
        d_data[command] = vals

    converter = Converter(width=d_data["Window size"][0], height=d_data["Window size"][1])

    vals = d_data["QL Background Size"]
    result[f"#question-area.{style}"]["width"] = converter.get_calc(vals[0], direction=Dimension.WIDTH)
    result[f"#question-area.{style}"]["height"] = converter.get_calc(vals[1], direction=Dimension.HEIGHT)

    vals = d_data["QL Background Location"]
    result[f"#question-area.{style}"]["left"] = converter.get_calc(vals[0], direction=Dimension.WIDTH)
    result[f"#question-area.{style}"]["top"] = converter.get_calc(vals[1], direction=Dimension.HEIGHT)

    vals = d_data["TG Background Size"]
    result[f"#money-tree-area.{style}"]["width"] = converter.get_calc(vals[0], direction=Dimension.WIDTH)
    result[f"#money-tree-area.{style}"]["height"] = converter.get_calc(vals[1], direction=Dimension.HEIGHT)

    vals = d_data["TG Background Location"]
    result[f"#money-tree-area.{style}"]["left"] = converter.get_calc(vals[0], direction=Dimension.WIDTH)
    result[f"#money-tree-area.{style}"]["top"] = converter.get_calc(vals[1], direction=Dimension.HEIGHT)

    if screen_type == ScreenType.TVSCREEN:
        vals = d_data["TG Current Position Image X Location"] + d_data["TG Current Position Image Y Location 15 questions"]
    else:
        vals = d_data["TG Current Position Image Location"]
    result[f"#money-tree-overlay.{style}"]["left"] = converter.get_calc(vals[0], direction=Dimension.WIDTH)
    result[f"#money-tree-overlay.{style}"]["top"] = converter.get_calc(vals[1], direction=Dimension.HEIGHT)

    vals = d_data["TG Current Position Image Size"]
    result[f"#money-tree-overlay.{style}"]["width"] = converter.get_calc(vals[0], direction=Dimension.WIDTH)
    result[f"#money-tree-overlay.{style}"]["height"] = converter.get_calc(vals[1], direction=Dimension.HEIGHT)

    no_of_lifelines = 4
    for i in range(no_of_lifelines):
        vals = d_data[f"LG Tree Icon {no_of_lifelines}-{i + 1} Size"]
        result[f"#lifeline-{i + 1}.{style}"]["width"] = converter.get_calc(vals[0], direction=Dimension.WIDTH)
        result[f"#lifeline-{i + 1}.{style}"]["height"] = converter.get_calc(vals[1], direction=Dimension.HEIGHT)

        vals = d_data[f"LG Tree Icon {no_of_lifelines}-{i + 1} Location"]
        result[f"#lifeline-{i + 1}.{style}"]["left"] = converter.get_calc(vals[0], direction=Dimension.WIDTH)
        result[f"#lifeline-{i + 1}.{style}"]["top"] = converter.get_calc(vals[1], direction=Dimension.HEIGHT)



        # if command == "QL Question Sizable Text Size":
        #     result["#ql-question-text"]["width"] = converter.get_calc(vals[0], Dimension.WIDTH)
        #     result["#ql-question-text"]["height"] = converter.get_calc(vals[1], Dimension.HEIGHT)

        # if command == "QL Question Sizable Text Location":
        #     result["#ql-question-text"]["left"] = converter.get_calc(vals[0], Dimension.WIDTH)
        #     result["#ql-question-text"]["top"] = converter.get_calc(vals[1], Dimension.HEIGHT)

        # if command == "QL Question Text Font":
        #     result["#ql-question-text"]["font-family"] = font_mapping[vals[0]]
        #     result["#ql-question-text"]["font-size"] = converter.get_calc(vals[1], direction=Dimension.HEIGHT)

        # if command == "QL Answer A Sizable Text Location":
        #     result["#ql-answer-A"]["left"] = converter.get_calc(vals[0], direction=Dimension.WIDTH)
        #     result["#ql-answer-C"]["left"] = converter.get_calc(vals[0], direction=Dimension.WIDTH)
        #     result["#ql-answer-A"]["top"] = converter.get_calc(vals[1], direction=Dimension.HEIGHT)
        #     result["#ql-answer-B"]["top"] = converter.get_calc(vals[1], direction=Dimension.HEIGHT)

        # if command == "QL Answer D Sizable Text Location":
        #     result["#ql-answer-B"]["left"] = converter.get_calc(vals[0], direction=Dimension.WIDTH)
        #     result["#ql-answer-D"]["left"] = converter.get_calc(vals[0], direction=Dimension.WIDTH)
        #     result["#ql-answer-C"]["top"] = converter.get_calc(vals[1], direction=Dimension.HEIGHT)
        #     result["#ql-answer-D"]["top"] = converter.get_calc(vals[1], direction=Dimension.HEIGHT)

        # if command == "QL Answers Text Size":
        #     result["#ql-answer-A"]["width"] = converter.get_calc(vals[0], direction=Dimension.WIDTH)
        #     result["#ql-answer-A"]["height"] = converter.get_calc(vals[1], direction=Dimension.HEIGHT)
        #     result["#ql-answer-B"]["width"] = converter.get_calc(vals[0], direction=Dimension.WIDTH)
        #     result["#ql-answer-B"]["height"] = converter.get_calc(vals[1], direction=Dimension.HEIGHT)
        #     result["#ql-answer-C"]["width"] = converter.get_calc(vals[0], direction=Dimension.WIDTH)
        #     result["#ql-answer-C"]["height"] = converter.get_calc(vals[1], direction=Dimension.HEIGHT)
        #     result["#ql-answer-D"]["width"] = converter.get_calc(vals[0], direction=Dimension.WIDTH)
        #     result["#ql-answer-D"]["height"] = converter.get_calc(vals[1], direction=Dimension.HEIGHT)

        # if command == "QL Answers Text Font":
        #     result[".ql-answer"]["font-family"] = font_mapping[vals[0]]
        #     result[".ql-answer"]["font-size"] = converter.get_calc(vals[1], direction=Dimension.HEIGHT)



    content = PyCSS.parse(result)
    write_css(style=style, screen_type=screen_type, content=content)
            

if __name__ == "__main__":
    styles: list[str] = ["wwm", "international-rave-revival", "international-2002"]
    for style in styles:
        for screen_type in ScreenType:
            convert(style=style, screen_type=screen_type)