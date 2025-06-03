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

class ScreenType(Enum):
    HOST = 1
    CONTESTANT = 2
    TVSCREEN = 3

def write_css(screen_type: ScreenType, content: str):
    with open(Path("styles") / f"amount_{screen_type.value}.css", "w") as file:
        file.write(content)


def convert(amount_file: Path, screen_type: ScreenType):
    with open(amount_file, "r") as file:
        data = file.readlines()

    content: str = ""
    result = defaultdict(dict)

    if screen_type == ScreenType.HOST:
        letter = "H"

    d_data = {}
    for line in data:
        try:
            command, vals = line.strip().split("|")[0], line.strip().split("|")[1:]
        except ValueError:
            continue
        
        d_data[command] = vals

    no_of_questions = 15
    for i in range(no_of_questions):
        vals: list[str] = d_data[f"H{i + 1}"]
        result[f"#money-tree-value-{i + 1}.host::before, #money-tree-value-{i + 1}.contestant::before"]["content"] = f"\"{' '.join(vals[0].split()[1:])}\""
        # result[f""]["content"] = f"\"{' '.join(vals[0].split()[1:])}\""

        vals: list[str] = d_data[f"A{i + 1}"]
        result[f"#money-tree-value-{i + 1}.tvscreen::before"]["content"] = f"\"{' '.join(vals[0].split()[1:])}\""

    content = PyCSS.parse(result)
    write_css(screen_type=screen_type, content=content)
            

if __name__ == "__main__":
    amount_file: Path = Path("graphics/international-2002/Amounts/UK.amounts")
    convert(amount_file=amount_file, screen_type=ScreenType.HOST)