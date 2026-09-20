// Each entry is rendered onto one face of the cube.
// Keep lines short so text stays legible.

export const codeSnippets = [
    {
        label: 'model.py',
        lang: 'python',
        lines: [
            'import torch',
            'import torch.nn as nn',
            '',
            'class Net(nn.Module):',
            '    def __init__(self):',
            '        super().__init__()',
            '        self.fc = nn.Linear(784, 10)',
            '    def forward(self, x):',
            '        return self.fc(x)'
        ]
    },
    {
        label: 'app.tsx',
        lang: 'tsx',
        lines: [
            'export default function App() {',
            '  const [data, setData] = useState()',
            '',
            '  useEffect(() => {',
            '    fetch("/api/predict")',
            '      .then(r => r.json())',
            '      .then(setData)',
            '  }, [])',
            '',
            '  return <View data={data} />',
            '}'
        ]
    },
    {
        label: 'train.py',
        lang: 'python',
        lines: [
            'for epoch in range(EPOCHS):',
            '    for x, y in loader:',
            '        pred = model(x)',
            '        loss = criterion(pred, y)',
            '        loss.backward()',
            '        optimizer.step()',
            '        optimizer.zero_grad()',
            '',
            '    print(f"epoch {epoch} loss {loss:.4f}")'
        ]
    },
    {
        label: 'api.ts',
        lang: 'ts',
        lines: [
            'export async function predict(',
            '  input: string',
            ') {',
            '  const res = await fetch("/infer", {',
            '    method: "POST",',
            '    body: JSON.stringify({ input })',
            '  })',
            '  return res.json()',
            '}'
        ]
    },
    {
        label: 'deploy.sh',
        lang: 'bash',
        lines: [
            '#!/usr/bin/env bash',
            'set -e',
            '',
            'docker build -t myapp .',
            'docker run -p 8000:8000 myapp',
            '',
            '# or with compose:',
            '# docker compose up -d',
            '',
            'echo "deployed ✓"'
        ]
    },
    {
        label: 'vector.py',
        lang: 'python',
        lines: [
            'from qdrant_client import Client',
            '',
            'client = Client(":memory:")',
            'client.create_collection(',
            '    "docs",',
            '    vectors_config={"size": 1536}',
            ')',
            '',
            'hits = client.search("docs", query)'
        ]
    }
]