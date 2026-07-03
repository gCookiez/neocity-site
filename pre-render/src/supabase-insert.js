import { createClient } from "@supabase/supabase-js"

const serverdb = {
    db: {
        schema: 'public'
    }
}

const categories = {};
//remind self to move api key to env
export const supabase = await createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_API_KEY)

export async function checkCategories() {
    const query = await supabase.from('blog_category').select('key_check, blog_category, id');
    console.log(query);
    for (var i of query.data) {
        categories[i['key_check']] = {
            name: i.blog_category,
            id: i.id
        }
    }

    console.log(await categories);
}

export async function insertToSupaTable(coll) {
    const transformedData = [];
    for (var [category, list] of Object.entries(coll)) {
        const arrayFormat = Object.entries(list).map(([k, v]) => (
            {
                created_at: new Date(v.date).toISOString(),
                title: v.title,
                LAST_CREATED: new Date(v.mtime).toISOString(),
                'file-id-legacy': v.fileId,
                author: v.author,
                blog_category: categories[category].id,
                content: v.content
            }
        )
        )
        transformedData.push(...arrayFormat);
    }

    try {
        const {data, error} = await supabase.from('blog_category_content')
                            .insert(transformedData);

        console.log(await data)
        console.log(await error)


    }
    catch(e) {
        console.error(e);
    }
    return;
}