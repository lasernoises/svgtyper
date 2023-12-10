const create_element = (
    name: string,
    attributes: { [k: string]: string },
    content: string | (SVGElement | string)[],
) => {
    const el = document.createElementNS("http://www.w3.org/2000/svg", name);

    for (const name in attributes) {
        el.setAttribute(name, attributes[name]);
    }

    if (typeof content === "string") {
        el.textContent = content;
    } else {
        for (const element of content) {
            if (typeof element === "string") {
                el.appendChild(document.createTextNode(element));
            } else {
                el.appendChild(element);
            }
        }
    }

    return el;
};

const text = "<<< >>>> ---[[[[]]] ((())))}}}{{{{}}}";

function render_text() {
    const svg: SVGElement = document.querySelector("svg")!;

    const text_node = create_element(
        "text",
        {
            x: "0",
            y: "30",
            "font-size": "30",
            "font-family": "monospace",
            fill: "black",
        },
        [
            create_element(
                "tspan",
                {
                    fill: "magenta",
                },
                "",
            ),
            create_element("tspan", {}, text),
            " ",
        ],
    );

    let error = false;
    let error_count = 0;

    svg.appendChild(text_node);
    svg.addEventListener("keydown", (e) => {
        if (e.key.length === 1) {
            const a = text_node.firstChild! as SVGElement;
            const b = text_node.childNodes[1]! as SVGElement;

            if (b.textContent![0] === e.key) {
                b.textContent = b.textContent!.slice(1);

                if (error) {
                    a.appendChild(
                        create_element("tspan", { fill: "red" }, e.key),
                    );
                    error = false;
                    error_count += 1;
                } else {
                    a.appendChild(document.createTextNode(e.key));
                }
            } else {
                error = true;
            }
        }
        console.log(e);
    });
}

function main() {
    render_text();
}

main();
