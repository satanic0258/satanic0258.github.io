---
layout: default
title: スニペット置き場index
---

# スニペット置き場index
---

スニペット置き場入り口です．  
<br>

記事は作成中です．  
全てのスニペットは[ココ](https://github.com/satanic0258/Cpp_snippet/tree/master/src)から見ることが出来ます．

---
{% for category-data in site.data.categorymap %}
  {% assign category = category-data | first %}
  <h2> {{ site.data.categorymap[category] }} </h2>
  <ul>
    {% for doc in site.snippets %}
      {% if doc.category == category %}
        <li><a href="{{ doc.url }}">{{ doc.title }}</a></li>
      {% endif %}
    {% endfor %}
  </ul>
{% endfor %}