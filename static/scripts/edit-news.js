const textarea = document.getElementById("textarea")

const simplemde = new SimpleMDE({ element: textarea});

const previewImage = document.getElementById("preview-image")
const title = document.getElementById("title-input")
const file = document.getElementById("file-input")

const metadata = document.querySelector("metadata")
const contentMode = metadata?.getAttribute("mode") ?? "create"
const contentText = metadata?.textContent
const contentId = metadata?.getAttribute("id")
const contentTitle = metadata?.getAttribute("title")

console.log(metadata)
console.log(contentMode)
console.log(contentId)
console.log(contentText)

const converter = new showdown.Converter();

if (contentTitle) {
    title.value = contentTitle
}

if (contentText) {
    simplemde.codemirror.setValue(converter.makeMarkdown(contentText))
}

if (contentMode == "edit") {
    file.required = false
}

document.getElementById("save").onclick = () => {
    const value = simplemde.codemirror.getValue()
    const html = converter.makeHtml(value)

    const form = getForm()

    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.name = 'poster'
    fileInput.files = file.files
    form.appendChild(fileInput)

    const textInput = document.createElement('input')
    textInput.type = 'text'
    textInput.name = 'content'
    textInput.value = html
    form.appendChild(textInput)

    const titleInput = document.createElement('input')
    titleInput.type = 'text'
    titleInput.name = 'title'
    titleInput.value = title.value
    form.appendChild(titleInput)

    document.getElementById('invisble').appendChild(form)

    console.log(new FormData(form))

    form.submit()
}

function getForm() {
    const form = document.createElement('form')
    form.action = contentMode == "create" ? "/admin/news" : `/admin/news/${contentId}/update`
    form.method = 'POST'
    form.enctype = file.files.length ? 'multipart/form-data' : "application/json"

    return form
}