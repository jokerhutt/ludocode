import Editor from '@monaco-editor/react';

type ProjectPageProps = {};

export function ProjectPage({}: ProjectPageProps) {
  return (
    <div className="grid col-span-full h-full grid-cols-12">
      <div className="col-span-1 bg-red-50 lg:col-span-2" />

      <div className="col-span-10 lg:col-span-8 flex flex-col gap-8 py-16 items-stretch justify-start h-full min-w-0">
      </div>

      <div className="col-span-1 bg-red-50 lg:col-span-2" />
    </div>
  );
}
